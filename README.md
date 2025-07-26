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
