import IReactionDTO from '@modules/posts/dtos/IReactionDTO';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateReactionService from './CreateReactionService';

export default class CreateReactionController {
  async handle(request: Request, response: Response) {
    const reactionData: IReactionDTO = request.body;
    reactionData.post_id = request.params.id;

    const createreactions = container.resolve(CreateReactionService);

    const reaction = await createreactions.execute(reactionData);

    return response.send(reaction);
  }
}
