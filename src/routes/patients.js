const express = require('express');
const router = express.Router();
const patientsController = require('../controllers/patientsController');

// Lista todos os pacientes
router.get('/', (req, res) => {
  patientsController.listPatients(req, res);
});

// Cadastra um novo paciente
router.post('/', (req, res) => {
  patientsController.addPatient(req, res);
});

// Histórico de consultas de um paciente
router.get('/:id/consultations', (req, res) => {
  patientsController.listConsultationsByPatient(req, res);
});

module.exports = router;
