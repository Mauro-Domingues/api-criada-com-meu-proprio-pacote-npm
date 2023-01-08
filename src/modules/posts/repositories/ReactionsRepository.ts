import IReactionDTO from '@modules/posts/dtos/IReactionDTO';
import { Repository } from 'typeorm';

import Reaction from '@modules/posts/entities/Reaction';
import IReactionsRepository from '@modules/posts/repositories/IReactionsRepository';
import IObjectDTO from '@dtos/IObjectDTO';
import { AppDataSource } from '../../../../dataSource';

export default class ReactionsRepository implements IReactionsRepository {
  private ormRepository: Repository<Reaction>;

  constructor() {
    this.ormRepository = AppDataSource.getRepository(Reaction);
  }

  public async findBy(
    reactionData: IObjectDTO | IObjectDTO[],
    relations?: string[],
  ): Promise<Reaction | null> {
    const reaction = await this.ormRepository.findOne({
      where: reactionData,
      relations,
    });

    return reaction;
  }

  public async findAll(
    page: number,
    limit: number,
    conditions?: IObjectDTO | IObjectDTO[],
    relations?: string[],
  ): Promise<{ reactions: Reaction[]; amount: number }> {
    const [reactions, amount] = await this.ormRepository.findAndCount({
      where: conditions,
      take: limit,
      skip: (page - 1) * limit,
      relations,
    });

    return { reactions, amount };
  }

  public async create(reactionData: IReactionDTO): Promise<Reaction> {
    const reaction = this.ormRepository.create(reactionData);

    await this.ormRepository.save(reaction);

    return reaction;
  }

  public async update(reactionData: Reaction): Promise<Reaction> {
    return this.ormRepository.save(reactionData);
  }

  public async delete(reactionData: IObjectDTO): Promise<void> {
    this.ormRepository.delete(reactionData);
  }

  public async softDelete(reactionData: IObjectDTO): Promise<void> {
    this.ormRepository.softDelete(reactionData);
  }
}
