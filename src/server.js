const express = require('express');
const app = express();
const patientsRouter = require('./routes/patients');

app.use(express.json());
app.use('/patients', patientsRouter);

app.get('/', (req, res) => {
  res.send('HealthFlow - Sistema de Saúde (v1 Estagiário)');
});

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
