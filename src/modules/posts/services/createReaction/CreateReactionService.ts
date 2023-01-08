import { injectable, inject } from 'tsyringe';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

import IReactionsRepository from '@modules/posts/repositories/IReactionsRepository';

import IResponseDTO from '@dtos/IResponseDTO';
import IReactionDTO from '@modules/posts/dtos/IReactionDTO';
import Reaction from '@modules/posts/entities/Reaction';
import IPostsRepository from '@modules/posts/repositories/IPostsRepository';
import AppError from '@shared/errors/AppError';

@injectable()
export default class CreateReactionService {
  constructor(
    @inject('ReactionsRepository')
    private reactionsRepository: IReactionsRepository,

    @inject('PostsRepository')
    private postsRepository: IPostsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  async execute(reactionData: IReactionDTO): Promise<IResponseDTO<Reaction>> {
    const post = await this.postsRepository.findBy({
      id: reactionData.post_id,
    });

    if (!post) {
      throw new AppError('Post não enconstrado', 404);
    }

    const reaction = await this.reactionsRepository.create({
      ...reactionData,
      post,
    });

    await this.cacheProvider.invalidatePrefix('reactions');

    return {
      code: 201,
      message_code: 'CREATED',
      message: 'Reaction successfully created',
      data: reaction,
    };
  }
}
