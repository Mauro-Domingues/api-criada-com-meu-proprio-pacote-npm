import FakeReactionRepository from '@modules/posts/repositories/fakes/FakeReactionsRepository';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import FakePostRepository from '@modules/posts/repositories/fakes/FakePostsRepository';
import ListReactionService from './ListReactionService';

let fakeReactionRepository: FakeReactionRepository;
let listReaction: ListReactionService;
let fakeCacheProvider: FakeCacheProvider;
let fakePostRepository: FakePostRepository;

describe('ListReactionService', () => {
  beforeEach(() => {
    fakeReactionRepository = new FakeReactionRepository();
    fakeCacheProvider = new FakeCacheProvider();
    fakePostRepository = new FakePostRepository();

    listReaction = new ListReactionService(
      fakeReactionRepository,
      fakeCacheProvider,
    );
  });

  it('should be able to list all the reactions', async () => {
    const post = await fakePostRepository.create({
      title: 'post',
      description: 'This is a post',
      slug: 'post',
    });

    const reaction01 = await fakeReactionRepository.create({
      reaction: 'This is a reaction 1',
      post_id: post.id,
    });

    const reaction02 = await fakeReactionRepository.create({
      reaction: 'This is a reaction 2',
      post_id: post.id,
    });

    const reactionList = await listReaction.execute(1, 2);

    expect(reactionList.data.list).toEqual([reaction01, reaction02]);
  });

  it('should be able to list all the reactions using cache', async () => {
    const post = await fakePostRepository.create({
      title: 'post',
      description: 'This is a post',
      slug: 'post',
    });

    const reaction01 = await fakeReactionRepository.create({
      reaction: 'This is a reaction',
      post_id: post.id,
    });

    const reaction02 = await fakeReactionRepository.create({
      reaction: 'This is a reaction',
      post_id: post.id,
    });

    await listReaction.execute(1, 2);

    const reactionList = await listReaction.execute(1, 2);

    expect(reactionList.data.list).toEqual([reaction01, reaction02]);
  });

  it('should be able to list the reactions with the specified pagination', async () => {
    const post = await fakePostRepository.create({
      title: 'post',
      description: 'This is a post',
      slug: 'post',
    });

    const reaction01 = await fakeReactionRepository.create({
      reaction: 'This is a reaction',
      post_id: post.id,
    });

    const reaction02 = await fakeReactionRepository.create({
      reaction: 'This is a reaction',
      post_id: post.id,
    });

    await fakeReactionRepository.create({
      reaction: 'This is a reaction 3',
      post_id: post.id,
    });

    const reactionList01 = await listReaction.execute(1, 1);

    expect(reactionList01.data.list).toEqual([reaction01]);

    const reactionList02 = await listReaction.execute(1, 2);
    expect(reactionList02.data.list).toEqual([reaction01, reaction02]);
  });
});
