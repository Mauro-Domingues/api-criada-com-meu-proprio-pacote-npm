import request from 'supertest';
import { Connection } from 'typeorm';
import createConnection from '@shared/typeorm';
import app from '@shared/app';

let connection: Connection;

describe('ListPostController', () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();

    await connection.query(
      `INSERT INTO posts(id, title, description, slug) values('12345', 'post', 'This is a post', 'post')`,
    );
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it('Should be able to list posts', async () => {
    const response = await request(app).get('/posts');

    expect(response.status).toBe(200);
    expect(response.body.data.list[0]).toHaveProperty('id');
  });
});
