import { Request, Response } from 'express';
import { container } from 'tsyringe';
import IObjectDTO from '@dtos/IObjectDTO';

import DeletePostService from './DeletePostService';

export default class DeletePostController {
  async handle(request: Request, response: Response) {
    const deleteposts = container.resolve(DeletePostService);

    const postParam: IObjectDTO = request.params;

    const post = deleteposts.execute(postParam);

    return response.send(post);
  }
}
