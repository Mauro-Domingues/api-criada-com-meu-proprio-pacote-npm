import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListPostService from './ListPostService';

export default class ListPostController {
  async handle(request: Request, response: Response) {
    const listPost = container.resolve(ListPostService);

    const { page = 1, limit = 20 } = request.query;

    const posts = await listPost.execute(Number(page), Number(limit));

    return response.send(posts);
  }
}
