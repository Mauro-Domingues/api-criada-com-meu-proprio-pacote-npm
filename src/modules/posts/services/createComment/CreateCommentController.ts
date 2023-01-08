import ICommentDTO from '@modules/posts/dtos/ICommentDTO';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateCommentService from './CreateCommentService';

export default class CreateCommentController {
  async handle(request: Request, response: Response) {
    const commentData: ICommentDTO = request.body;
    commentData.post_id = request.params.id;

    const createcomments = container.resolve(CreateCommentService);

    const comment = await createcomments.execute(commentData);

    return response.send(comment);
  }
}
