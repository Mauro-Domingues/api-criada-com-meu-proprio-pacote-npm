import request from 'supertest';
import { DataSource } from 'typeorm';
import createConnection from '@shared/typeorm';
import app from '@shared/app';

let connection: DataSource;

describe('DeleteCommentController', () => {
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

  it('Should be able to delete a comment', async () => {
    const response = await request(app).delete('/posts/track/comments/12345');

    expect(response.status).toBe(200);
  });
});
