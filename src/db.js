const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./healthflow.db');

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS patients (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    age INTEGER,
    contact TEXT
  )`);
});

module.exports = db;
