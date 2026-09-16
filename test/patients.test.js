const request = require('supertest');
const app = require('../src/server');

describe('Pacientes API', () => {
  let token;

  beforeAll(async () => {
    await request(app)
      .post('/users')
      .send({ username: 'admin', password: '123456', role: 'admin' });

    const res = await request(app)
      .post('/login')
      .send({ username: 'admin', password: '123456' });
    token = res.body.token;
  });

  it('GET /patients sem token deve retornar 401', async () => {
    const res = await request(app).get('/patients');
    expect(res.statusCode).toBe(401);
  });

  it('GET /patients com token deve retornar lista', async () => {
    const res = await request(app)
      .get('/patients')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
