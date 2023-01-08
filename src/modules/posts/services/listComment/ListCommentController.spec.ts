import request from 'supertest';
import { DataSource } from 'typeorm';
import createConnection from '@shared/typeorm';
import app from '@shared/app';

let connection: DataSource;

describe('ListCommentController', () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();

    await connection.query(
      `INSERT INTO posts(id, title, description, slug) values('12345', 'post', 'This is a post', 'post')`,
    );

    return connection.query(
      `INSERT INTO comments(id, comment, post_id) values('12345','This is a comment', '12345')`,
    );
  });

  afterAll(async () => {
    await connection.dropDatabase();
    return connection.destroy();
  });

  it('Should be able to list comments', async () => {
    const response = await request(app).get('/posts/track/comments');

    expect(response.status).toBe(200);
    expect(response.body.data.list[0]).toHaveProperty('id');
  });
});
