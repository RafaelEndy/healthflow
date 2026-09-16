const express = require('express');
const bcrypt = require('bcrypt');
const { body, validationResult } = require('express-validator');
const usersModel = require('../models/userModel');
const router = express.Router();

// Cadastro de novo usuário
router.post(
  '/',
  [
    body('username').notEmpty().withMessage('Username é obrigatório'),
    body('password').isLength({ min: 6 }).withMessage('Senha deve ter pelo menos 6 caracteres'),
    body('role').isIn(['admin', 'funcionario', 'cliente']).withMessage('Role inválido')
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, password, role } = req.body;

    try {
      const passwordHash = await bcrypt.hash(password, 10);

      const newUser = await usersModel.createUser(username, passwordHash, role);

      res.status(201).json({ message: 'Usuário criado com sucesso', user: newUser });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Erro ao criar usuário' });
    }
  }
);

module.exports = router;
