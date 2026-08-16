const request = require('supertest');
const express = require('express');
const patientsRouter = require('../src/routes/patients');

const app = express();
app.use(express.json());
app.use('/patients', patientsRouter);

describe('Pacientes API', () => {
  it('GET /patients deve retornar lista', async () => {
    const res = await request(app).get('/patients');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
