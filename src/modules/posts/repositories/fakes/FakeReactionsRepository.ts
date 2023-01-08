/* eslint-disable guard-for-in */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-restricted-syntax */
import IReactionDTO from '@modules/posts/dtos/IReactionDTO';
import Reaction from '@modules/posts/entities/Reaction';
import IReactionsRepository from '@modules/posts/repositories/IReactionsRepository';
import { v4 as uuid } from 'uuid';
import IObjectDTO from '@dtos/IObjectDTO';

export default class FakeReactionsRepository implements IReactionsRepository {
  private reactions: Reaction[] = [];

  public async findBy(
    reactionData: IObjectDTO | IObjectDTO[],
  ): Promise<Reaction | null> {
    let findReaction: Reaction | Reaction[] | undefined;
    if (reactionData && Array.isArray(reactionData)) {
      for (const property of reactionData) {
        findReaction = this.reactions.find(
          (reaction: any) =>
            reaction[Object.keys(property)[0]] ===
            property[Object.keys(property)[0]],
        );

        if (findReaction !== undefined) {
          return findReaction;
        }
      }
    } else if (reactionData) {
      for (const key in reactionData) {
        findReaction = this.reactions.filter(
          (reaction: any) => reaction[key] === reactionData[key],
        );
      }

      findReaction = this.reactions.find(reaction => reaction);

      if (findReaction) {
        return findReaction;
      }
    }

    return null;
  }

  public async findAll(
    page: number,
    limit: number,
    conditions?: IObjectDTO | IObjectDTO[],
  ): Promise<{ reactions: Reaction[]; amount: number }> {
    let filterReaction: Reaction[] | undefined;
    if (conditions && Array.isArray(conditions)) {
      for (const property of conditions) {
        filterReaction = this.reactions.filter(
          (reaction: any) =>
            reaction[Object.keys(property)[0]] ===
            property[Object.keys(property)[0]],
        );

        if (filterReaction !== undefined) {
          return { reactions: filterReaction, amount: filterReaction.length };
        }
      }
    } else if (conditions) {
      for (const key in conditions) {
        filterReaction = this.reactions.filter(
          (reaction: any) => reaction[key] === conditions[key],
        );
      }

      filterReaction = this.reactions.slice((page - 1) * limit, page * limit);

      return { reactions: filterReaction, amount: filterReaction.length };
    }

    const findReaction = this.reactions.slice((page - 1) * limit, page * limit);

    return { reactions: findReaction, amount: findReaction.length };
  }

  public async create(reactionData: IReactionDTO): Promise<Reaction> {
    const reaction = new Reaction();

    Object.assign(reaction, { id: uuid() }, reactionData);
    this.reactions.push(reaction);

    return reaction;
  }

  public async update(reactionData: Reaction): Promise<Reaction> {
    const findReaction = this.reactions.findIndex(
      reaction => reaction.id === reactionData.id,
    );

    this.reactions[findReaction] = reactionData;

    return reactionData;
  }

  public async delete(reactionData: IObjectDTO): Promise<void> {
    const findReaction = this.reactions.findIndex(
      reaction => reaction.id === reactionData.id,
    );

    this.reactions.splice(findReaction, 1);
  }

  public async softDelete(reactionData: IObjectDTO): Promise<void> {
    const findReaction = this.reactions.findIndex(
      reaction => reaction.id === reactionData.id,
    );

    this.reactions.splice(findReaction, 1);
  }
}
