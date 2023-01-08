import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListCommentService from './ListCommentService';

export default class ListCommentController {
  async handle(request: Request, response: Response) {
    const listComment = container.resolve(ListCommentService);

    const { page = 1, limit = 20 } = request.query;

    const comments = await listComment.execute(Number(page), Number(limit));

    return response.send(comments);
  }
}
