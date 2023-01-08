import Reaction from '@modules/posts/entities/Reaction';
import IObjectDTO from '@dtos/IObjectDTO';
import IReactionDTO from '@modules/posts/dtos/IReactionDTO';

export default interface IReactionsRepository {
  findAll(
    page: number,
    limit: number,
    conditions?: IObjectDTO | IObjectDTO[],
    relations?: string[],
  ): Promise<{ reactions: Reaction[]; amount: number }>;
  findBy(
    reactionData: IObjectDTO | IObjectDTO[],
    relations?: string[],
  ): Promise<Reaction | null>;
  create(reactionData: IReactionDTO): Promise<Reaction>;
  update(reactionData: Reaction): Promise<Reaction>;
  delete(reactionData: IObjectDTO): void;
  softDelete(reactionData: IObjectDTO): void;
}
