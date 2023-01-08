import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListReactionService from './ListReactionService';

export default class ListReactionController {
  async handle(request: Request, response: Response) {
    const listReaction = container.resolve(ListReactionService);

    const { page = 1, limit = 20 } = request.query;

    const reactions = await listReaction.execute(Number(page), Number(limit));

    return response.send(reactions);
  }
}
