import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';

import FakeCommentRepository from '@modules/posts/repositories/fakes/FakeCommentsRepository';
import FakePostsRepository from '@modules/posts/repositories/fakes/FakePostsRepository';
import AppError from '@shared/errors/AppError';
import CreateCommentServices from './CreateCommentService';

let fakeCommentRepository: FakeCommentRepository;
let fakeCacheProvider: FakeCacheProvider;
let fakePostRepository: FakePostsRepository;
let createComment: CreateCommentServices;

describe('CreateCommentService', () => {
  beforeEach(() => {
    fakeCommentRepository = new FakeCommentRepository();
    fakeCacheProvider = new FakeCacheProvider();
    fakePostRepository = new FakePostsRepository();

    createComment = new CreateCommentServices(
      fakeCommentRepository,
      fakePostRepository,
      fakeCacheProvider,
    );
  });

  it('should be able to create a new comment', async () => {
    const post = await fakePostRepository.create({
      title: 'post',
      description: 'This is a post',
      slug: 'post',
    });

    const comment = await createComment.execute({
      comment: 'This is a comment',
      post_id: post.id,
    });

    expect(comment.data).toHaveProperty('id');
  });

  it('should return App error', async () => {
    await expect(
      createComment.execute({
        comment: 'This is a comment',
        post_id: 'non-existant-post',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
