import { injectable, inject } from 'tsyringe';

import IReactionsRepository from '@modules/posts/repositories/IReactionsRepository';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import IListDTO from '@dtos/IListDTO';
import Reaction from '@modules/posts/entities/Reaction';
import ICacheDTO from '@dtos/ICacheDTO';

@injectable()
export default class ListReactionService {
  constructor(
    @inject('ReactionsRepository')
    private reactionsRepository: IReactionsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  async execute(page: number, limit: number): Promise<IListDTO<Reaction>> {
    const cacheKey = `reactions:${page}:${limit}`;

    let cache = await this.cacheProvider.recovery<ICacheDTO<Reaction>>(
      cacheKey,
    );

    if (!cache) {
      const reactions = await this.reactionsRepository.findAll(page, limit);
      cache = { data: reactions.reactions, total: reactions.amount };
      await this.cacheProvider.save(cacheKey, cache);
    }

    return {
      code: 200,
      message_code: 'OK',
      message: 'Reactions found successfully',
      data: {
        total: cache.total,
        page,
        perPage: limit,
        list: cache.data,
      },
    };
  }
}
