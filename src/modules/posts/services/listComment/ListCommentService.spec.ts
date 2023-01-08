import FakeCommentRepository from '@modules/posts/repositories/fakes/FakeCommentsRepository';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import FakePostRepository from '@modules/posts/repositories/fakes/FakePostsRepository';
import ListCommentService from './ListCommentService';

let fakeCommentRepository: FakeCommentRepository;
let listComment: ListCommentService;
let fakeCacheProvider: FakeCacheProvider;
let fakePostRepository: FakePostRepository;

describe('ListCommentService', () => {
  beforeEach(() => {
    fakeCommentRepository = new FakeCommentRepository();
    fakeCacheProvider = new FakeCacheProvider();
    fakePostRepository = new FakePostRepository();

    listComment = new ListCommentService(
      fakeCommentRepository,
      fakeCacheProvider,
    );
  });

  it('should be able to list all the comments', async () => {
    const post = await fakePostRepository.create({
      title: 'post',
      description: 'This is a post',
      slug: 'post',
    });

    const comment01 = await fakeCommentRepository.create({
      comment: 'This is a comment 1',
      post_id: post.id,
    });

    const comment02 = await fakeCommentRepository.create({
      comment: 'This is a comment 2',
      post_id: post.id,
    });

    const commentList = await listComment.execute(1, 2);

    expect(commentList.data.list).toEqual([comment01, comment02]);
  });

  it('should be able to list all the comments using cache', async () => {
    const post = await fakePostRepository.create({
      title: 'post',
      description: 'This is a post',
      slug: 'post',
    });

    const comment01 = await fakeCommentRepository.create({
      comment: 'This is a comment 1',
      post_id: post.id,
    });

    const comment02 = await fakeCommentRepository.create({
      comment: 'This is a commen 2',
      post_id: post.id,
    });

    await listComment.execute(1, 2);

    const commentList = await listComment.execute(1, 2);

    expect(commentList.data.list).toEqual([comment01, comment02]);
  });

  it('should be able to list the comments with the specified pagination', async () => {
    const post = await fakePostRepository.create({
      title: 'post',
      description: 'This is a post',
      slug: 'post',
    });

    const comment01 = await fakeCommentRepository.create({
      comment: 'This is a comment 1',
      post_id: post.id,
    });

    const comment02 = await fakeCommentRepository.create({
      comment: 'This is a comment 2',
      post_id: post.id,
    });

    await fakeCommentRepository.create({
      comment: 'This is a comment 3',
      post_id: post.id,
    });

    const commentList01 = await listComment.execute(1, 1);

    expect(commentList01.data.list).toEqual([comment01]);

    const commentList02 = await listComment.execute(1, 2);
    expect(commentList02.data.list).toEqual([comment01, comment02]);
  });
});
