const request = require('supertest');
const express = require('express');
const consultationsRouter = require('../src/routes/consultations');

const app = express();
app.use(express.json());
app.use('/consultations', consultationsRouter);

describe('Consultas API', () => {
  it('GET /consultations deve retornar lista', async () => {
    const res = await request(app).get('/consultations');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
