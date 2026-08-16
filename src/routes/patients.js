const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', (req, res) => {
  db.all("SELECT * FROM patients", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

router.get('/:id/consultations', (req, res) => {
  const patientId = req.params.id;
  db.all("SELECT * FROM consultations WHERE patient_id = ?", [patientId], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});


router.post('/', (req, res) => {
  const { name, age, contact } = req.body;
  db.run("INSERT INTO patients (name, age, contact) VALUES (?, ?, ?)",
    [name, age, contact],
    function(err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: this.lastID, name, age, contact });
    });
});

module.exports = router;
