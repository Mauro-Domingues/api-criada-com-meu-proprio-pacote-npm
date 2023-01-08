/* eslint-disable guard-for-in */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-restricted-syntax */
import ICommentDTO from '@modules/posts/dtos/ICommentDTO';
import Comment from '@modules/posts/entities/Comment';
import ICommentsRepository from '@modules/posts/repositories/ICommentsRepository';
import { v4 as uuid } from 'uuid';
import IObjectDTO from '@dtos/IObjectDTO';

export default class FakeCommentsRepository implements ICommentsRepository {
  private comments: Comment[] = [];

  public async findBy(
    commentData: IObjectDTO | IObjectDTO[],
  ): Promise<Comment | null> {
    let findComment: Comment | Comment[] | undefined;
    if (commentData && Array.isArray(commentData)) {
      for (const property of commentData) {
        findComment = this.comments.find(
          (comment: any) =>
            comment[Object.keys(property)[0]] ===
            property[Object.keys(property)[0]],
        );

        if (findComment !== undefined) {
          return findComment;
        }
      }
    } else if (commentData) {
      for (const key in commentData) {
        findComment = this.comments.filter(
          (comment: any) => comment[key] === commentData[key],
        );
      }

      findComment = this.comments.find(comment => comment);

      if (findComment) {
        return findComment;
      }
    }

    return null;
  }

  public async findAll(
    page: number,
    limit: number,
    conditions?: IObjectDTO | IObjectDTO[],
  ): Promise<{ comments: Comment[]; amount: number }> {
    let filterComment: Comment[] | undefined;
    if (conditions && Array.isArray(conditions)) {
      for (const property of conditions) {
        filterComment = this.comments.filter(
          (comment: any) =>
            comment[Object.keys(property)[0]] ===
            property[Object.keys(property)[0]],
        );

        if (filterComment !== undefined) {
          return { comments: filterComment, amount: filterComment.length };
        }
      }
    } else if (conditions) {
      for (const key in conditions) {
        filterComment = this.comments.filter(
          (comment: any) => comment[key] === conditions[key],
        );
      }

      filterComment = this.comments.slice((page - 1) * limit, page * limit);

      return { comments: filterComment, amount: filterComment.length };
    }

    const findComment = this.comments.slice((page - 1) * limit, page * limit);

    return { comments: findComment, amount: findComment.length };
  }

  public async create(commentData: ICommentDTO): Promise<Comment> {
    const comment = new Comment();

    Object.assign(comment, { id: uuid() }, commentData);
    this.comments.push(comment);

    return comment;
  }

  public async update(commentData: Comment): Promise<Comment> {
    const findComment = this.comments.findIndex(
      comment => comment.id === commentData.id,
    );

    this.comments[findComment] = commentData;

    return commentData;
  }

  public async delete(commentData: IObjectDTO): Promise<void> {
    const findComment = this.comments.findIndex(
      comment => comment.id === commentData.id,
    );

    this.comments.splice(findComment, 1);
  }

  public async softDelete(commentData: IObjectDTO): Promise<void> {
    const findComment = this.comments.findIndex(
      comment => comment.id === commentData.id,
    );

    this.comments.splice(findComment, 1);
  }
}
