import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IPostsRepository from '@modules/posts/repositories/IPostsRepository';
import IObjectDTO from '@dtos/IObjectDTO';
import IResponseDTO from '@dtos/IResponseDTO';
import Post from '@modules/posts/entities/Post';
import mapAndCloneAttribute from '@utils/mappers/mapAndCloneAttribute';

@injectable()
export default class ShowPostService {
  constructor(
    @inject('PostsRepository')
    private postsRepository: IPostsRepository,
  ) {}

  async execute(postParam: IObjectDTO): Promise<IResponseDTO<Post>> {
    const post = await this.postsRepository.findBy(
      await mapAndCloneAttribute(['id', 'slug'], postParam),
      ['comments', 'reactions'],
    );

    if (!post) {
      throw new AppError('Post not found', 404);
    }

    return {
      code: 200,
      message_code: 'OK',
      message: 'Post found successfully',
      data: post,
    };
  }
}
