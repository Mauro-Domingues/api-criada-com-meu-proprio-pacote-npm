import AppError from '@shared/errors/AppError';
import FakeReactionRepository from '@modules/posts/repositories/fakes/FakeReactionsRepository';
import FakePostRepository from '@modules/posts/repositories/fakes/FakePostsRepository';
import ShowReactionService from './ShowReactionService';

let fakeReactionRepository: FakeReactionRepository;
let showReaction: ShowReactionService;
let fakePostRepository: FakePostRepository;

describe('ShowReactionService', () => {
  beforeEach(() => {
    fakeReactionRepository = new FakeReactionRepository();
    fakePostRepository = new FakePostRepository();

    showReaction = new ShowReactionService(fakeReactionRepository);
  });

  it('should be able to show the reaction', async () => {
    const post = await fakePostRepository.create({
      title: 'post',
      description: 'This is a post',
      slug: 'post',
    });

    const reaction = await fakeReactionRepository.create({
      reaction: 'This is a reaction',
      post_id: post.id,
    });

    const getReaction = await showReaction.execute({
      id: reaction.id,
    });

    expect(getReaction.data).toHaveProperty('id');
    expect(getReaction.data).toEqual(reaction);
  });

  it('should not be able to show reactions with a non-existing id', async () => {
    await expect(
      showReaction.execute({
        id: 'non-existing-reaction-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
