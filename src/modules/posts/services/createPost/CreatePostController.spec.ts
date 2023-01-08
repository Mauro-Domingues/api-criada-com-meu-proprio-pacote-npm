import request from 'supertest';
import { Connection } from 'typeorm';

import app from '@shared/app';
import createConnection from '@shared/typeorm';

let connection: Connection;

describe('CreatePostController', () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it('Should be able to create a post', async () => {
    const response = await request(app).post('/posts').send({
      title: 'post',
      description: 'This is a post',
      slug: 'post',
    });

    expect(response.status).toBe(200);
    expect(response.body.data).toHaveProperty('id');
  });
});
