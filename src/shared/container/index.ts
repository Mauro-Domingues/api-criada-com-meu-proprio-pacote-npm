import './providers';

import { container } from 'tsyringe';
import IPostsRepository from '@modules/posts/repositories/IPostsRepository';
import PostsRepository from '@modules/posts/repositories/PostsRepository';
import ICommentsRepository from '@modules/posts/repositories/ICommentsRepository';
import CommentsRepository from '@modules/posts/repositories/CommentsRepository';
import IReactionsRepository from '@modules/posts/repositories/IReactionsRepository';
import ReactionsRepository from '@modules/posts/repositories/ReactionsRepository';

container.registerSingleton<IPostsRepository>(
  'PostsRepository',
  PostsRepository,
);

container.registerSingleton<ICommentsRepository>(
  'CommentsRepository',
  CommentsRepository,
);

container.registerSingleton<IReactionsRepository>(
  'ReactionsRepository',
  ReactionsRepository,
);

container.registerSingleton<ICommentsRepository>(
  'CommentsRepository',
  CommentsRepository,
);

container.registerSingleton<IReactionsRepository>(
  'ReactionsRepository',
  ReactionsRepository,
);
