import request from 'supertest';
import { DataSource } from 'typeorm';
import createConnection from '@shared/typeorm';
import app from '@shared/app';

let connection: DataSource;

describe('DeleteReactionController', () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();

    await connection.query(
      `INSERT INTO posts(id, title, description, slug) values('12345', 'post', 'This is a post', 'post')`,
    );

    await connection.query(
      `INSERT INTO reactions(id, reaction, post_id) values('12345', 'This is a reaction', '12345')`,
    );
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.destroy();
  });

  it('Should be able to delete a reaction', async () => {
    const response = await request(app).delete('/posts/track/reactions/12345');

    expect(response.status).toBe(200);
  });
});
