# 🏦 Bank Loan Management System

This project is a simple REST API that simulates a bank's loan management system. It allows the bank to lend money, accept payments, view ledgers, and display customer account overviews.

---

## 🚀 Tech Stack

- **Backend**: Node.js + Express.js
- **Database**: SQLite (file-based)
- **Tooling**: Postman (for API testing)

---

## 📦 Features

- ✅ **LEND**: Create a loan for a customer
- ✅ **PAYMENT**: Accept EMI or lump sum payments
- ✅ **LEDGER**: View all transactions for a loan
- ✅ **ACCOUNT OVERVIEW**: Display all loans for a customer with balance info

---

## 📁 Project Structure

Bank-system-backend/
│
├── db/
│   └── database.db         # SQLite database file
│
├── models/
│   └── loanModel.js        # DB logic (CRUD)
│
├── routes/
│   └── loanRoutes.js       # Routes for APIs
│
├── server.js               # Entry point
│
├── package.json            # Node project file


---

## 🔧 How to Run

1. **Clone the repo**  
   ```bash
   git clone https://github.com/your-username/bank-loan-system.git
   cd bank-loan-system
  bash```
2. **Install dependencies**
  ```bash
  npm install
  ```
3. **Run the server**
   ```bash
   node server.js
  bash```
4. Server runs on http://localhost:3000


## 📮 API Endpoints
**➤ LEND**
POST /api/lend
Body:
{
  "customer_id": "C123",
  "loan_amount": 100000,
  "loan_period": 2,
  "interest_rate": 10
}

**➤ PAYMENT**
POST /api/payment
Body:
{
  "loan_id": 1,
  "type": "EMI",
  "amount": 5000
}

**➤ LEDGER**
GET /api/ledger/:loan_id

**➤ ACCOUNT OVERVIEW**
GET /api/overview/:customer_id


##📌 Notes
1. Interest is calculated as: I = P × N × R / 100

2. Total repayable = P + I

3. Monthly EMI = ceil(Total / (N × 12))
