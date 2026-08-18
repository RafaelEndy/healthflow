const express = require('express');
const patientsRouter = require('./routes/patients');
const consultationsRouter = require('./routes/consultations');
const { router: loginRouter } = require('./auth/login');
const authenticateToken = require('./auth/auth');

const app = express();
app.use(express.json());

// rota pública
app.use('/login', loginRouter);

// rotas protegidas
app.use('/patients', authenticateToken, patientsRouter);
app.use('/consultations', authenticateToken, consultationsRouter);

app.get('/', (req, res) => {
  res.send('HealthFlow - Sistema de Saúde (v4 Sênior)');
});

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
