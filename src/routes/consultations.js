const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', (req, res) => {
  db.all("SELECT * FROM consultations", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

router.post('/', (req, res) => {
  const { patient_id, date, description } = req.body;

  if (!patient_id || !date) {
    return res.status(400).json({ error: "patient_id e date são obrigatórios" });
  }

  db.run("INSERT INTO consultations (patient_id, date, description) VALUES (?, ?, ?)",
    [patient_id, date, description],
    function(err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: this.lastID, patient_id, date, description });
    });
});

module.exports = router;
