import { Request, Response } from 'express';
import { container } from 'tsyringe';
import IObjectDTO from '@dtos/IObjectDTO';

import DeleteCommentService from './DeleteCommentService';

export default class DeleteCommentController {
  async handle(request: Request, response: Response) {
    const deletecomments = container.resolve(DeleteCommentService);

    const commentParam: IObjectDTO = request.params;

    const comment = deletecomments.execute(commentParam);

    return response.send(comment);
  }
}
