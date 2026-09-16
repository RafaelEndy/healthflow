const express = require('express');
const patientsRouter = require('./routes/patients');
const consultationsRouter = require('./routes/consultations');
const { router: loginRouter } = require('./auth/login');
const usersRouter = require('./routes/user'); 
const authenticateToken = require('./auth/auth');
const config = require('../config.js');

const app = express();
app.use(express.json());

app.use('/login', loginRouter);
app.use('/users', usersRouter); 

app.use('/patients', authenticateToken, patientsRouter);
app.use('/consultations', authenticateToken, consultationsRouter);

app.get('/', (req, res) => {
  res.send('HealthFlow - Sistema de Saúde (v5 Arquiteto)');
});

app.listen(config.port, () => {
  console.log(`Servidor rodando na porta ${config.port}`);
});

module.exports = app; 
