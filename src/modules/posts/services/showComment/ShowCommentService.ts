import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import ICommentsRepository from '@modules/posts/repositories/ICommentsRepository';
import IObjectDTO from '@dtos/IObjectDTO';
import IResponseDTO from '@dtos/IResponseDTO';
import Comment from '@modules/posts/entities/Comment';

@injectable()
export default class ShowCommentService {
  constructor(
    @inject('CommentsRepository')
    private commentsRepository: ICommentsRepository,
  ) {}

  async execute(commentParam: IObjectDTO): Promise<IResponseDTO<Comment>> {
    const comment = await this.commentsRepository.findBy(commentParam, [
      'post',
    ]);

    if (!comment) {
      throw new AppError('Comment not found', 404);
    }

    return {
      code: 200,
      message_code: 'OK',
      message: 'Comment found successfully',
      data: comment,
    };
  }
}
