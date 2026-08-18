const consultationsModel = require('../models/consultationsModel');

function listConsultations(req, res) {
  consultationsModel.getAllConsultations((err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
}

function addConsultation(req, res) {
  const { patient_id, date, description } = req.body;
  if (!patient_id || !date || !description) {
    return res.status(400).json({ error: 'Dados inválidos' });
  }
  consultationsModel.createConsultation(patient_id, date, description, (err, consultation) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(consultation);
  });
}

module.exports = { listConsultations, addConsultation };
