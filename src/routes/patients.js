const express = require('express');
const router = express.Router();
const patientsController = require('../controllers/patientsController');
const authenticateToken = require('../auth/auth'); 
const authorizeRole = require('../auth/authorizeRole'); 
const { body, validationResult } = require('express-validator');

router.get('/', authenticateToken, (req, res) => {
  patientsController.listPatients(req, res);
});

router.post(
  '/',
  authenticateToken,
  authorizeRole('admin'),
  [
    body('name').notEmpty().withMessage('Nome é obrigatório'),
    body('age').isInt({ min: 0 }).withMessage('Idade deve ser um número positivo'),
    body('contact').isEmail().withMessage('Contato deve ser um email válido')
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    patientsController.addPatient(req, res);
  }
);

router.get('/:id/consultations', authenticateToken, (req, res) => {
  patientsController.listConsultationsByPatient(req, res);
});

module.exports = router;
