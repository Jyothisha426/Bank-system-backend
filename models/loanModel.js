const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/database.db');

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS loans (
    loan_id INTEGER PRIMARY KEY AUTOINCREMENT,
    customer_id TEXT,
    principal REAL,
    interest REAL,
    total_amount REAL,
    emi REAL,
    loan_period INTEGER,
    interest_rate REAL,
    remaining_amount REAL,
    emi_left INTEGER
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS payments (
    payment_id INTEGER PRIMARY KEY AUTOINCREMENT,
    loan_id INTEGER,
    type TEXT,
    amount REAL,
    date TEXT
  )`);
});

module.exports = db;
