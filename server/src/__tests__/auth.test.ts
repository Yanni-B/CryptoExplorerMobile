import request from 'supertest';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import app from '../index';

let mongoServer: MongoMemoryServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
});

afterAll(async () => {
  await mongoose.disconnect();
  if (mongoServer) await mongoServer.stop();
});

afterEach(async () => {
  // clear db
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    await collections[key].deleteMany({});
  }
});

describe('Auth routes', () => {
  test('POST /api/auth/register creates user and returns token', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({ name: 'Jest User', email: 'jest@example.com', password: 'Pass1234' })
      .set('Accept', 'application/json');

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('token');
    expect(res.body).toHaveProperty('user');
    expect(res.body.user).toMatchObject({ email: 'jest@example.com', name: 'Jest User' });
  });

  test('POST /api/auth/register with existing email returns 409', async () => {
    await request(app)
      .post('/api/auth/register')
      .send({ name: 'Jest User', email: 'jest@example.com', password: 'Pass1234' })
      .set('Accept', 'application/json');

    const res = await request(app)
      .post('/api/auth/register')
      .send({ name: 'Jest User', email: 'jest@example.com', password: 'Pass1234' })
      .set('Accept', 'application/json');

    expect(res.status).toBe(409);
    expect(res.body).toHaveProperty('message');
  });
});
