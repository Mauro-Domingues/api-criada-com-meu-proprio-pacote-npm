import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import AppError from '@shared/errors/AppError';

import FakeCommentRepository from '@modules/posts/repositories/fakes/FakeCommentsRepository';
import FakePostRepository from '@modules/posts/repositories/fakes/FakePostsRepository';
import DeleteCommentServices from './DeleteCommentService';

let fakeCommentRepository: FakeCommentRepository;
let fakeCacheProvider: FakeCacheProvider;
let deleteComment: DeleteCommentServices;
let fakePostRepository: FakePostRepository;

describe('DeleteCommentService', () => {
  beforeEach(() => {
    fakeCommentRepository = new FakeCommentRepository();
    fakeCacheProvider = new FakeCacheProvider();
    fakePostRepository = new FakePostRepository();

    deleteComment = new DeleteCommentServices(
      fakeCommentRepository,
      fakeCacheProvider,
    );
  });

  it('should be able to delete a new comment', async () => {
    const post = await fakePostRepository.create({
      title: 'post',
      description: 'This is a post',
      slug: 'post',
    });

    const comment = await fakeCommentRepository.create({
      comment: 'This is a comment',
      post_id: post.id,
    });

    await deleteComment.execute({ id: comment.id });

    const deletedComment = await fakeCommentRepository.findBy({
      id: comment.id,
    });

    expect(deletedComment).toBe(null);
  });

  it('should return App error', async () => {
    await expect(deleteComment.execute({})).rejects.toBeInstanceOf(AppError);
  });
});
