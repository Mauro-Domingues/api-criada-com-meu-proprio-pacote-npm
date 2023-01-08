import IPostDTO from '@modules/posts/dtos/IPostDTO';
import { getRepository, Repository } from 'typeorm';

import Post from '@modules/posts/entities/Post';
import IPostsRepository from '@modules/posts/repositories/IPostsRepository';
import IObjectDTO from '@dtos/IObjectDTO';

export default class PostsRepository implements IPostsRepository {
  private ormRepository: Repository<Post>;

  constructor() {
    this.ormRepository = getRepository(Post);
  }

  public async findBy(
    postData: IObjectDTO | IObjectDTO[],
    relations?: string[],
  ): Promise<Post | null> {
    const post = await this.ormRepository.findOne({
      where: postData,
      relations,
    });

    return post;
  }

  public async findAll(
    page: number,
    limit: number,
    conditions?: IObjectDTO | IObjectDTO[],
    relations?: string[],
  ): Promise<{ posts: Post[]; amount: number }> {
    const [posts, amount] = await this.ormRepository.findAndCount({
      where: conditions,
      take: limit,
      skip: (page - 1) * limit,
      relations,
    });

    return { posts, amount };
  }

  public async create(postData: IPostDTO): Promise<Post> {
    const post = this.ormRepository.create(postData);

    await this.ormRepository.save(post);

    return post;
  }

  public async update(postData: Post): Promise<Post> {
    return this.ormRepository.save(postData);
  }

  public async delete(postData: IObjectDTO): Promise<void> {
    this.ormRepository.delete(postData);
  }

  public async softDelete(postData: IObjectDTO): Promise<void> {
    this.ormRepository.softDelete(postData);
  }
}
