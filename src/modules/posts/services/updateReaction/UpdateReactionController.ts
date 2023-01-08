import { Request, Response } from 'express';
import { container } from 'tsyringe';

import IReactionDTO from '@modules/posts/dtos/IReactionDTO';
import IObjectDTO from '@dtos/IObjectDTO';
import UpdateReactionService from './UpdateReactionService';

export default class UpdateReactionController {
  async handle(request: Request, response: Response) {
    const updateReaction = container.resolve(UpdateReactionService);

    const reactionParam: IObjectDTO = request.params;
    const reactionData: IReactionDTO = request.body;

    const reaction = await updateReaction.execute(reactionParam, reactionData);

    return response.send(reaction);
  }
}
