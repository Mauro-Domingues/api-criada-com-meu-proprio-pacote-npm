import request from 'supertest';
import { DataSource } from 'typeorm';
import createConnection from '@shared/typeorm';
import app from '@shared/app';

let connection: DataSource;

describe('UpdatePostController', () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();

    await connection.query(
      `INSERT INTO posts(id, title, description, slug) values('12345', 'post', 'This is a post', 'post')`,
    );
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.destroy();
  });

  it('Should be able to update posts', async () => {
    const response = await request(app).put('/posts/12345').send({
      title: 'updatedPost',
    });

    expect(response.status).toBe(200);
    expect(response.body.data.title).toEqual('updatedPost');
  });
});
