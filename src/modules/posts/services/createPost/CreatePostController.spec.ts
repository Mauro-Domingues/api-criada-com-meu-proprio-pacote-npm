import request from 'supertest';
import { DataSource } from 'typeorm';

import app from '@shared/app';
import createConnection from '@shared/typeorm';

let connection: DataSource;

describe('CreatePostController', () => {
  beforeAll(async () => {
    connection = await createConnection();
    return connection.runMigrations();
  });

  afterAll(async () => {
    await connection.dropDatabase();
    return connection.destroy();
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
