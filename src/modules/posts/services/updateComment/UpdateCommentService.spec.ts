import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import AppError from '@shared/errors/AppError';

import FakeCommentRepository from '@modules/posts/repositories/fakes/FakeCommentsRepository';
import FakePostRepository from '@modules/posts/repositories/fakes/FakePostsRepository';
import UpdateCommentService from './UpdateCommentService';

let fakeCommentRepository: FakeCommentRepository;
let fakeCacheProvider: FakeCacheProvider;
let updateCommentService: UpdateCommentService;
let fakePostRepository: FakePostRepository;

describe('UpdateCommentService', () => {
  beforeEach(() => {
    fakeCommentRepository = new FakeCommentRepository();
    fakeCacheProvider = new FakeCacheProvider();
    fakePostRepository = new FakePostRepository();

    updateCommentService = new UpdateCommentService(
      fakeCommentRepository,
      fakeCacheProvider,
    );
  });

  it('should update the comment', async () => {
    const post = await fakePostRepository.create({
      title: 'post',
      description: 'This is a post',
      slug: 'post',
    });

    const comment = await fakeCommentRepository.create({
      comment: 'This is a comment',
      post_id: post.id,
    });

    const updatedComment = await updateCommentService.execute(
      { id: comment.id },
      { comment: 'updatedComment', post_id: post.id },
    );

    expect(updatedComment.data.comment).toEqual('updatedComment');
  });

  it('should return App Error', async () => {
    await expect(
      updateCommentService.execute({}, { comment: '', post_id: '' }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
