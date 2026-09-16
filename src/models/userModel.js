const db = require('../db');

async function findByUsername(username) {
  return new Promise((resolve, reject) => {
    db.get('SELECT * FROM users WHERE username = ?', [username], (err, row) => {
      if (err) reject(err);
      resolve(row);
    });
  });
}

async function createUser(username, passwordHash, role) {
  return new Promise((resolve, reject) => {
    db.run(
      'INSERT OR IGNORE INTO users (username, password, role) VALUES (?, ?, ?)',
      [username, passwordHash, role],
      function (err) {
        if (err) reject(err);
        resolve({ id: this.lastID, username, role });
      }
    );
  });
}

module.exports = { findByUsername, createUser };
