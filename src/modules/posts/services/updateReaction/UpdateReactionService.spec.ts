import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import AppError from '@shared/errors/AppError';

import FakeReactionRepository from '@modules/posts/repositories/fakes/FakeReactionsRepository';
import FakePostRepository from '@modules/posts/repositories/fakes/FakePostsRepository';
import UpdateReactionService from './UpdateReactionService';

let fakeReactionRepository: FakeReactionRepository;
let fakeCacheProvider: FakeCacheProvider;
let updateReactionService: UpdateReactionService;
let fakePostRepository: FakePostRepository;

describe('UpdateReactionService', () => {
  beforeEach(() => {
    fakeReactionRepository = new FakeReactionRepository();
    fakeCacheProvider = new FakeCacheProvider();
    fakePostRepository = new FakePostRepository();

    updateReactionService = new UpdateReactionService(
      fakeReactionRepository,
      fakeCacheProvider,
    );
  });

  it('should update the reaction', async () => {
    const post = await fakePostRepository.create({
      title: 'post',
      description: 'This is a post',
      slug: 'post',
    });

    const reaction = await fakeReactionRepository.create({
      reaction: 'This is a reaction',
      post_id: post.id,
    });

    const updatedReaction = await updateReactionService.execute(
      { id: reaction.id },
      { reaction: 'updatedReaction', post_id: post.id },
    );

    expect(updatedReaction.data.reaction).toEqual('updatedReaction');
  });

  it('should return App Error', async () => {
    await expect(
      updateReactionService.execute({}, { reaction: '', post_id: '' }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
