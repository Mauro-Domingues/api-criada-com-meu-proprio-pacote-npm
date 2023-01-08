import Comment from '@modules/posts/entities/Comment';
import IObjectDTO from '@dtos/IObjectDTO';
import ICommentDTO from '@modules/posts/dtos/ICommentDTO';

export default interface ICommentsRepository {
  findAll(
    page: number,
    limit: number,
    conditions?: IObjectDTO | IObjectDTO[],
    relations?: string[],
  ): Promise<{ comments: Comment[]; amount: number }>;
  findBy(
    commentData: IObjectDTO | IObjectDTO[],
    relations?: string[],
  ): Promise<Comment | null>;
  create(commentData: ICommentDTO): Promise<Comment>;
  update(commentData: Comment): Promise<Comment>;
  delete(commentData: IObjectDTO): void;
  softDelete(commentData: IObjectDTO): void;
}
