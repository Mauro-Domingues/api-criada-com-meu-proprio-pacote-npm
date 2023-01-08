import request from 'supertest';
import { Connection } from 'typeorm';

import app from '@shared/app';
import createConnection from '@shared/typeorm';

let connection: Connection;

describe('CreateReactionController', () => {
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
