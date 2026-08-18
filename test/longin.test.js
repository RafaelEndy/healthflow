const request = require('supertest');
const express = require('express');
const { router: loginRouter } = require('../src/auth/login');
const authenticateToken = require('../src/auth/auth');
const patientsRouter = require('../src/routes/patients');

const app = express();
app.use(express.json());

// rota pública de login
app.use('/login', loginRouter);

// rota protegida de pacientes
app.use('/patients', authenticateToken, patientsRouter);

describe('Autenticação JWT', () => {
  let token;

  it('POST /login deve retornar token válido', async () => {
    const res = await request(app)
      .post('/login')
      .send({ username: 'admin', password: '123456' });

    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();
    token = res.body.token;
  });

  it('GET /patients sem token deve retornar 401', async () => {
    const res = await request(app).get('/patients');
    expect(res.statusCode).toBe(401);
  });

  it('GET /patients com token deve retornar 200', async () => {
    const res = await request(app)
      .get('/patients')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
