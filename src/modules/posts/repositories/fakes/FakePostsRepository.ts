/* eslint-disable guard-for-in */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-restricted-syntax */
import IPostDTO from '@modules/posts/dtos/IPostDTO';
import Post from '@modules/posts/entities/Post';
import IPostsRepository from '@modules/posts/repositories/IPostsRepository';
import { v4 as uuid } from 'uuid';
import IObjectDTO from '@dtos/IObjectDTO';

export default class FakePostsRepository implements IPostsRepository {
  private posts: Post[] = [];

  public async findBy(
    postData: IObjectDTO | IObjectDTO[],
  ): Promise<Post | null> {
    let findPost: Post | Post[] | undefined;
    if (postData && Array.isArray(postData)) {
      for (const property of postData) {
        findPost = this.posts.find(
          (post: any) =>
            post[Object.keys(property)[0]] ===
            property[Object.keys(property)[0]],
        );

        if (findPost !== undefined) {
          return findPost;
        }
      }
    } else if (postData) {
      for (const key in postData) {
        findPost = this.posts.filter(
          (post: any) => post[key] === postData[key],
        );
      }

      findPost = this.posts.find(post => post);

      if (findPost) {
        return findPost;
      }
    }
    return null;
  }

  public async findAll(
    page: number,
    limit: number,
    conditions?: IObjectDTO | IObjectDTO[],
  ): Promise<{ posts: Post[]; amount: number }> {
    let filterPost: Post[] | undefined;
    if (conditions && Array.isArray(conditions)) {
      for (const property of conditions) {
        filterPost = this.posts.filter(
          (post: any) =>
            post[Object.keys(property)[0]] ===
            property[Object.keys(property)[0]],
        );

        if (filterPost !== undefined) {
          return { posts: filterPost, amount: filterPost.length };
        }
      }
    } else if (conditions) {
      for (const key in conditions) {
        filterPost = this.posts.filter(
          (post: any) => post[key] === conditions[key],
        );
      }

      filterPost = this.posts.slice((page - 1) * limit, page * limit);

      return { posts: filterPost, amount: filterPost.length };
    }

    const findPost = this.posts.slice((page - 1) * limit, page * limit);

    return { posts: findPost, amount: findPost.length };
  }

  public async create(postData: IPostDTO): Promise<Post> {
    const post = new Post();

    Object.assign(post, { id: uuid() }, postData);
    this.posts.push(post);

    return post;
  }

  public async update(postData: Post): Promise<Post> {
    const findPost = this.posts.findIndex(post => post.id === postData.id);

    this.posts[findPost] = postData;

    return postData;
  }

  public async delete(postData: IObjectDTO): Promise<void> {
    const findPost = this.posts.findIndex(post => post.id === postData.id);

    this.posts.splice(findPost, 1);
  }

  public async softDelete(postData: IObjectDTO): Promise<void> {
    const findPost = this.posts.findIndex(post => post.id === postData.id);

    this.posts.splice(findPost, 1);
  }
}
