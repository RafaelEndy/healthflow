const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

const SECRET = 'segredo_super_seguranca';

const USER = { username: 'admin', password: '123456' };

router.post('/', (req, res) => {
  const { username, password } = req.body;
  if (username === USER.username && password === USER.password) {
    const token = jwt.sign({ username }, SECRET, { expiresIn: '1h' });
    res.json({ token });
  } else {
    res.status(401).json({ error: 'Credenciais inválidas' });
  }
});

module.exports = { router, SECRET };
