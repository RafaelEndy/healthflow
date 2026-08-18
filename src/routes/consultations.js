const express = require('express');
const router = express.Router();
const consultationsController = require('../controllers/consultationsController');

// Lista todas as consultas
router.get('/', (req, res) => {
  consultationsController.listConsultations(req, res);
});

// Cadastra uma nova consulta
router.post('/', (req, res) => {
  consultationsController.addConsultation(req, res);
});

module.exports = router;
