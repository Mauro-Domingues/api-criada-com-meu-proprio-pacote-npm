import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IReactionsRepository from '@modules/posts/repositories/IReactionsRepository';
import IObjectDTO from '@dtos/IObjectDTO';
import IResponseDTO from '@dtos/IResponseDTO';
import Reaction from '@modules/posts/entities/Reaction';

@injectable()
export default class ShowReactionService {
  constructor(
    @inject('ReactionsRepository')
    private reactionsRepository: IReactionsRepository,
  ) {}

  async execute(reactionParam: IObjectDTO): Promise<IResponseDTO<Reaction>> {
    const reaction = await this.reactionsRepository.findBy(reactionParam, []);

    if (!reaction) {
      throw new AppError('Reaction not found', 404);
    }

    return {
      code: 200,
      message_code: 'OK',
      message: 'Reaction found successfully',
      data: reaction,
    };
  }
}
