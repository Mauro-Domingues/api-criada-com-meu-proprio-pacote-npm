import request from 'supertest';
import { Connection } from 'typeorm';

import app from '@shared/app';
import createConnection from '@shared/typeorm';

let connection: Connection;

describe('CreateCommentController', () => {
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

  it('Should be able to create a comment', async () => {
    const response = await request(app)
      .post('/posts/12345/track/comments')
      .send({
        comment: 'This is a comment',
        post_id: '12345',
      });

    expect(response.status).toBe(200);
    expect(response.body.data).toHaveProperty('id');
  });
});
