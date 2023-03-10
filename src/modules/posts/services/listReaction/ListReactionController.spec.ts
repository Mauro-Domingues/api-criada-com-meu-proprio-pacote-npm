import request from 'supertest';
import { DataSource } from 'typeorm';
import createConnection from '@shared/typeorm';
import app from '@shared/app';

let connection: DataSource;

describe('ListReactionController', () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();

    await connection.query(
      `INSERT INTO posts(id, title, description, slug) values('12345', 'post', 'This is a post', 'post')`,
    );

    return connection.query(
      `INSERT INTO reactions(id, reaction, post_id) values('12345', 'This is a reaction', '12345')`,
    );
  });

  afterAll(async () => {
    await connection.dropDatabase();
    return connection.destroy();
  });

  it('Should be able to list reactions', async () => {
    const response = await request(app).get('/posts/track/reactions');

    expect(response.status).toBe(200);
    expect(response.body.data.list[0]).toHaveProperty('id');
  });
});
