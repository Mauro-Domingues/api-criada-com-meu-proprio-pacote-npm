import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

import IReactionsRepository from '@modules/posts/repositories/IReactionsRepository';
import IReactionDTO from '@modules/posts/dtos/IReactionDTO';
import IResponseDTO from '@dtos/IResponseDTO';
import IObjectDTO from '@dtos/IObjectDTO';
import mapAndUpdateAttribute from '@utils/mappers/mapAndUpdateAttribute';
import Reaction from '@modules/posts/entities/Reaction';

@injectable()
export default class UpdateReactionService {
  constructor(
    @inject('ReactionsRepository')
    private reactionsRepository: IReactionsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  async execute(
    reactionParam: IObjectDTO,
    reactionData: IReactionDTO,
  ): Promise<IResponseDTO<Reaction>> {
    const reaction = await this.reactionsRepository.findBy(reactionParam);

    if (!reaction) {
      throw new AppError('Reaction not found', 404);
    }

    await this.cacheProvider.invalidatePrefix('reactions');

    await this.reactionsRepository.update(
      await mapAndUpdateAttribute(reaction, reactionData),
    );

    return {
      code: 200,
      message_code: 'OK',
      message: 'successfully updated reaction',
      data: reaction,
    };
  }
}
