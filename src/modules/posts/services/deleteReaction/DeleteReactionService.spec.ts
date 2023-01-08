import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import AppError from '@shared/errors/AppError';

import FakeReactionRepository from '@modules/posts/repositories/fakes/FakeReactionsRepository';
import FakePostRepository from '@modules/posts/repositories/fakes/FakePostsRepository';
import DeleteReactionServices from './DeleteReactionService';

let fakeReactionRepository: FakeReactionRepository;
let fakeCacheProvider: FakeCacheProvider;
let deleteReaction: DeleteReactionServices;
let fakePostRepository: FakePostRepository;

describe('DeleteReactionService', () => {
  beforeEach(() => {
    fakeReactionRepository = new FakeReactionRepository();
    fakeCacheProvider = new FakeCacheProvider();
    fakePostRepository = new FakePostRepository();

    deleteReaction = new DeleteReactionServices(
      fakeReactionRepository,
      fakeCacheProvider,
    );
  });

  it('should be able to delete a new reaction', async () => {
    const post = await fakePostRepository.create({
      title: 'post',
      description: 'This is a post',
      slug: 'post',
    });

    const reaction = await fakeReactionRepository.create({
      reaction: 'This is a reaction',
      post_id: post.id,
    });

    await deleteReaction.execute({ id: reaction.id });

    const deletedReaction = await fakeReactionRepository.findBy({
      id: reaction.id,
    });

    expect(deletedReaction).toBe(null);
  });

  it('should return App error', async () => {
    await expect(deleteReaction.execute({})).rejects.toBeInstanceOf(AppError);
  });
});
