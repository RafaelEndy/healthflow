const patientsModel = require('../models/patientsModel');

function listPatients(req, res) {
  patientsModel.getAllPatients((err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
}

function addPatient(req, res) {
  const { name, age, contact } = req.body;
  if (!name || !age || !contact) {
    return res.status(400).json({ error: 'Dados inválidos' });
  }
  patientsModel.createPatient(name, age, contact, (err, patient) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(patient);
  });
}

function listConsultationsByPatient(req, res) {
  const patientId = req.params.id;
  patientsModel.getConsultationsByPatient(patientId, (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
}

module.exports = { listPatients, addPatient, listConsultationsByPatient };
