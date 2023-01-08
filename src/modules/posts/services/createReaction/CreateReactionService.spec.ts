import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';

import FakeReactionRepository from '@modules/posts/repositories/fakes/FakeReactionsRepository';
import FakePostsRepository from '@modules/posts/repositories/fakes/FakePostsRepository';
import AppError from '@shared/errors/AppError';
import CreateReactionServices from './CreateReactionService';

let fakeReactionRepository: FakeReactionRepository;
let fakeCacheProvider: FakeCacheProvider;
let createReaction: CreateReactionServices;
let fakePostRepository: FakePostsRepository;

describe('CreateReactionService', () => {
  beforeEach(() => {
    fakeReactionRepository = new FakeReactionRepository();
    fakeCacheProvider = new FakeCacheProvider();
    fakePostRepository = new FakePostsRepository();

    createReaction = new CreateReactionServices(
      fakeReactionRepository,
      fakePostRepository,
      fakeCacheProvider,
    );
  });

  it('should be able to create a new reaction', async () => {
    const post = await fakePostRepository.create({
      title: 'post',
      description: 'This is a post',
      slug: 'post',
    });

    const reaction = await createReaction.execute({
      reaction: 'This is a reaction',
      post_id: post.id,
    });

    expect(reaction.data).toHaveProperty('id');
  });

  it('should return App error', async () => {
    await expect(
      createReaction.execute({
        reaction: 'This is a reaction',
        post_id: 'non-existant-post',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
