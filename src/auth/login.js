const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const router = express.Router();
const config = require('../../config.js'); 
const usersModel = require('../models/userModel');

router.post('/', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await usersModel.findByUsername(username);
    if (!user) {
      return res.status(401).json({ error: 'Usuário não encontrado' });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      config.jwtSecret,
      { expiresIn: '1h' }
    );

    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro interno no servidor' });
  }
});

module.exports = { router };
