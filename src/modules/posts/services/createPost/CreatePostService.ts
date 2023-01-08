import { injectable, inject } from 'tsyringe';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

import IPostsRepository from '@modules/posts/repositories/IPostsRepository';

import IResponseDTO from '@dtos/IResponseDTO';
import IPostDTO from '@modules/posts/dtos/IPostDTO';
import Post from '@modules/posts/entities/Post';

@injectable()
export default class CreatePostService {
  constructor(
    @inject('PostsRepository')
    private postsRepository: IPostsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  async execute(postData: IPostDTO): Promise<IResponseDTO<Post>> {
    // eslint-disable-next-line no-param-reassign
    postData.slug = postData.title.replace(' ', '-');
    const post = await this.postsRepository.create(postData);

    await this.cacheProvider.invalidatePrefix('posts');

    return {
      code: 201,
      message_code: 'CREATED',
      message: 'Post successfully created',
      data: post,
    };
  }
}
