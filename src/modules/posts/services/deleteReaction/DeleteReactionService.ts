import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

import IReactionsRepository from '@modules/posts/repositories/IReactionsRepository';
import IObjectDTO from '@dtos/IObjectDTO';
import IResponseDTO from '@dtos/IResponseDTO';

@injectable()
export default class DeleteReactionService {
  constructor(
    @inject('ReactionsRepository')
    private reactionsRepository: IReactionsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  async execute(reactionParam: IObjectDTO): Promise<IResponseDTO<null>> {
    const reaction = await this.reactionsRepository.findBy(reactionParam);

    if (!reaction) {
      throw new AppError('Reaction not found', 404);
    }

    await this.cacheProvider.invalidatePrefix('reactions');

    this.reactionsRepository.delete(reactionParam);

    return {
      code: 204,
      message_code: 'NO_CONTENT',
      message: 'successfully deleted reaction',
      data: null,
    };
  }
}
