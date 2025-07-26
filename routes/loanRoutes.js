const express = require('express');
const router = express.Router();
const db = require('../models/loanModel');

// Utility for calculating interest
const calculateLoanDetails = (P, N, R) => {
  const I = (P * N * R) / 100;
  const A = P + I;
  const emi = Math.ceil(A / (N * 12));
  return { interest: I, totalAmount: A, emi };
};

// LEND
router.post('/lend', (req, res) => {
  const { customer_id, loan_amount, loan_period, interest_rate } = req.body;
  const { interest, totalAmount, emi } = calculateLoanDetails(loan_amount, loan_period, interest_rate);
  const emi_left = loan_period * 12;

  db.run(`INSERT INTO loans (customer_id, principal, interest, total_amount, emi, loan_period, interest_rate, remaining_amount, emi_left)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [customer_id, loan_amount, interest, totalAmount, emi, loan_period, interest_rate, totalAmount, emi_left],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      return res.status(201).json({
        loan_id: this.lastID,
        total_amount: totalAmount,
        monthly_emi: emi
      });
    });
});

// PAYMENT
router.post('/payment', (req, res) => {
  const { loan_id, type, amount } = req.body;
  const date = new Date().toISOString();

  db.get(`SELECT * FROM loans WHERE loan_id = ?`, [loan_id], (err, loan) => {
    if (err || !loan) return res.status(404).json({ error: "Loan not found" });

    let remaining = loan.remaining_amount - amount;
    let emi_left = Math.ceil(remaining / loan.emi);

    db.run(`UPDATE loans SET remaining_amount = ?, emi_left = ? WHERE loan_id = ?`,
      [remaining, emi_left, loan_id]);

    db.run(`INSERT INTO payments (loan_id, type, amount, date) VALUES (?, ?, ?, ?)`,
      [loan_id, type, amount, date]);

    return res.json({ message: 'Payment recorded', remaining_amount: remaining, emi_left });
  });
});

// LEDGER
router.get('/ledger/:loan_id', (req, res) => {
  const loan_id = req.params.loan_id;

  db.get(`SELECT * FROM loans WHERE loan_id = ?`, [loan_id], (err, loan) => {
    if (err || !loan) return res.status(404).json({ error: "Loan not found" });

    db.all(`SELECT * FROM payments WHERE loan_id = ?`, [loan_id], (err, payments) => {
      return res.json({
        loan_id,
        transactions: payments,
        balance_amount: loan.remaining_amount,
        monthly_emi: loan.emi,
        emi_left: loan.emi_left
      });
    });
  });
});

// ACCOUNT OVERVIEW
router.get('/overview/:customer_id', (req, res) => {
  const { customer_id } = req.params;

  db.all(`SELECT * FROM loans WHERE customer_id = ?`, [customer_id], (err, loans) => {
    if (err) return res.status(500).json({ error: err.message });

    const promises = loans.map(loan => {
      return new Promise((resolve) => {
        db.all(`SELECT SUM(amount) as paid FROM payments WHERE loan_id = ?`, [loan.loan_id], (err, result) => {
          resolve({
            loan_id: loan.loan_id,
            principal: loan.principal,
            total_amount: loan.total_amount,
            interest: loan.interest,
            emi: loan.emi,
            paid: result[0]?.paid || 0,
            emi_left: loan.emi_left
          });
        });
      });
    });

    Promise.all(promises).then(data => res.json(data));
  });
});

module.exports = router;
