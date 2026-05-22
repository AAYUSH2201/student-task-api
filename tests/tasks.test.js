const request = require('supertest');
const app = require('../src/app');

describe('Student Task Manager API', () => {
  test('GET /health should return UP status', async () => {
    const res = await request(app).get('/health');

    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('UP');
  });

  test('POST /tasks should create a new task', async () => {
    const res = await request(app)
      .post('/tasks')
      .send({ title: 'Complete Jenkins task' });

    expect(res.statusCode).toBe(201);
    expect(res.body.title).toBe('Complete Jenkins task');
    expect(res.body.completed).toBe(false);
  });

  test('GET /tasks should return task list', async () => {
    const res = await request(app).get('/tasks');

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});