import { injectable, inject } from 'tsyringe';

import ICommentsRepository from '@modules/posts/repositories/ICommentsRepository';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import IListDTO from '@dtos/IListDTO';
import Comment from '@modules/posts/entities/Comment';
import ICacheDTO from '@dtos/ICacheDTO';

@injectable()
export default class ListCommentService {
  constructor(
    @inject('CommentsRepository')
    private commentsRepository: ICommentsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  async execute(page: number, limit: number): Promise<IListDTO<Comment>> {
    const cacheKey = `comments:${page}:${limit}`;

    let cache = await this.cacheProvider.recovery<ICacheDTO<Comment>>(cacheKey);

    if (!cache) {
      const comments = await this.commentsRepository.findAll(page, limit);
      cache = { data: comments.comments, total: comments.amount };
      await this.cacheProvider.save(cacheKey, cache);
    }

    return {
      code: 200,
      message_code: 'OK',
      message: 'Comments found successfully',
      data: {
        total: cache.total,
        page,
        perPage: limit,
        list: cache.data,
      },
    };
  }
}
