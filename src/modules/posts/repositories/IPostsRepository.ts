import Post from '@modules/posts/entities/Post';
import IObjectDTO from '@dtos/IObjectDTO';
import IPostDTO from '@modules/posts/dtos/IPostDTO';

export default interface IPostsRepository {
  findAll(
    page: number,
    limit: number,
    conditions?: IObjectDTO | IObjectDTO[],
    relations?: string[],
  ): Promise<{ posts: Post[]; amount: number }>;
  findBy(
    postData: IObjectDTO | IObjectDTO[],
    relations?: string[],
  ): Promise<Post | null>;
  create(postData: IPostDTO): Promise<Post>;
  update(postData: Post): Promise<Post>;
  delete(postData: IObjectDTO): void;
  softDelete(postData: IObjectDTO): void;
}
