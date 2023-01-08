import { Request, Response } from 'express';
import { container } from 'tsyringe';
import IObjectDTO from '@dtos/IObjectDTO';

import ShowReactionService from './ShowReactionService';

export default class ShowReactionController {
  async handle(request: Request, response: Response) {
    const showReaction = container.resolve(ShowReactionService);

    const reactionParam: IObjectDTO = request.params;

    const reaction = await showReaction.execute(reactionParam);

    return response.send(reaction);
  }
}
