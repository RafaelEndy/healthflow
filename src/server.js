const express = require('express');
const app = express();
const patientsRouter = require('./routes/patients');
const consultationsRouter = require('./routes/consultations');

app.use(express.json());
app.use('/patients', patientsRouter);
app.use('/consultations', consultationsRouter);

app.get('/', (req, res) => {
  res.send('HealthFlow - Sistema de Saúde (v2 júnior)');
});

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
