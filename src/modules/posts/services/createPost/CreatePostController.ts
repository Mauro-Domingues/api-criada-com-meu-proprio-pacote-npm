import IPostDTO from '@modules/posts/dtos/IPostDTO';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreatePostService from './CreatePostService';

export default class CreatePostController {
  async handle(request: Request, response: Response) {
    const postData: IPostDTO = request.body;

    const createposts = container.resolve(CreatePostService);

    const post = await createposts.execute(postData);

    return response.send(post);
  }
}
