import request from 'supertest';
import { DataSource } from 'typeorm';

import app from '@shared/app';
import createConnection from '@shared/typeorm';

let connection: DataSource;

describe('CreateReactionController', () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();

    return connection.query(
      `INSERT INTO posts(id, title, description, slug) values('12345', 'post', 'This is a post', 'post')`,
    );
  });

  afterAll(async () => {
    await connection.dropDatabase();
    return connection.destroy();
  });

  it('Should be able to create a reaction', async () => {
    const response = await request(app)
      .post('/posts/12345/track/reactions')
      .send({
        reaction: 'This is a reaction',
        post_id: '12345',
      });

    expect(response.status).toBe(200);
    expect(response.body.data).toHaveProperty('id');
  });
});
