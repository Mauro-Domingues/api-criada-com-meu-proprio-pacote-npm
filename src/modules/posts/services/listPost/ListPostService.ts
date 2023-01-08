import { injectable, inject } from 'tsyringe';

import IPostsRepository from '@modules/posts/repositories/IPostsRepository';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import IListDTO from '@dtos/IListDTO';
import Post from '@modules/posts/entities/Post';
import ICacheDTO from '@dtos/ICacheDTO';

@injectable()
export default class ListPostService {
  constructor(
    @inject('PostsRepository')
    private postsRepository: IPostsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  async execute(page: number, limit: number): Promise<IListDTO<Post>> {
    const cacheKey = `posts:${page}:${limit}`;

    let cache = await this.cacheProvider.recovery<ICacheDTO<Post>>(cacheKey);

    if (!cache) {
      const posts = await this.postsRepository.findAll(page, limit);
      cache = { data: posts.posts, total: posts.amount };
      await this.cacheProvider.save(cacheKey, cache);
    }

    return {
      code: 200,
      message_code: 'OK',
      message: 'Posts found successfully',
      data: {
        total: cache.total,
        page,
        perPage: limit,
        list: cache.data,
      },
    };
  }
}
