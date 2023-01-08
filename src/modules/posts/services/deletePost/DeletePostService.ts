import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

import IPostsRepository from '@modules/posts/repositories/IPostsRepository';
import IObjectDTO from '@dtos/IObjectDTO';
import IResponseDTO from '@dtos/IResponseDTO';

@injectable()
export default class DeletePostService {
  constructor(
    @inject('PostsRepository')
    private postsRepository: IPostsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  async execute(postParam: IObjectDTO): Promise<IResponseDTO<null>> {
    const post = await this.postsRepository.findBy(postParam);

    if (!post) {
      throw new AppError('Post not found', 404);
    }

    await this.cacheProvider.invalidatePrefix('posts');

    this.postsRepository.delete(postParam);

    return {
      code: 204,
      message_code: 'NO_CONTENT',
      message: 'successfully deleted post',
      data: null,
    };
  }
}
