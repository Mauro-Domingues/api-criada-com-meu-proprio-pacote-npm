import { Request, Response } from 'express';
import { container } from 'tsyringe';
import IObjectDTO from '@dtos/IObjectDTO';

import DeleteReactionService from './DeleteReactionService';

export default class DeleteReactionController {
  async handle(request: Request, response: Response) {
    const deletereactions = container.resolve(DeleteReactionService);

    const reactionParam: IObjectDTO = request.params;

    const reaction = deletereactions.execute(reactionParam);

    return response.send(reaction);
  }
}
