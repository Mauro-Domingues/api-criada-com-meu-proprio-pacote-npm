import { injectable, inject } from 'tsyringe';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

import ICommentsRepository from '@modules/posts/repositories/ICommentsRepository';

import IResponseDTO from '@dtos/IResponseDTO';
import ICommentDTO from '@modules/posts/dtos/ICommentDTO';
import Comment from '@modules/posts/entities/Comment';
import IPostsRepository from '@modules/posts/repositories/IPostsRepository';
import AppError from '@shared/errors/AppError';

@injectable()
export default class CreateCommentService {
  constructor(
    @inject('CommentsRepository')
    private commentsRepository: ICommentsRepository,

    @inject('PostsRepository')
    private postsRepository: IPostsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  async execute(commentData: ICommentDTO): Promise<IResponseDTO<Comment>> {
    const post = await this.postsRepository.findBy({
      id: commentData.post_id,
    });

    if (!post) {
      throw new AppError('Post não enconstrado', 404);
    }

    const comment = await this.commentsRepository.create({
      ...commentData,
      post,
    });

    await this.cacheProvider.invalidatePrefix('comments');

    return {
      code: 201,
      message_code: 'CREATED',
      message: 'Comment successfully created',
      data: comment,
    };
  }
}
