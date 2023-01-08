import AppError from '@shared/errors/AppError';
import FakeCommentRepository from '@modules/posts/repositories/fakes/FakeCommentsRepository';
import FakePostRepository from '@modules/posts/repositories/fakes/FakePostsRepository';
import ShowCommentService from './ShowCommentService';

let fakeCommentRepository: FakeCommentRepository;
let fakePostRepository: FakePostRepository;
let showComment: ShowCommentService;

describe('ShowCommentService', () => {
  beforeEach(() => {
    fakeCommentRepository = new FakeCommentRepository();
    fakePostRepository = new FakePostRepository();

    showComment = new ShowCommentService(fakeCommentRepository);
  });

  it('should be able to show the comment', async () => {
    const post = await fakePostRepository.create({
      title: 'post',
      description: 'This is a post',
      slug: 'post',
    });

    const comment = await fakeCommentRepository.create({
      comment: 'This is a comment',
      post_id: post.id,
    });

    const getComment = await showComment.execute({
      id: comment.id,
    });

    expect(getComment.data).toHaveProperty('id');
    expect(getComment.data).toEqual(comment);
  });

  it('should not be able to show comments with a non-existing id', async () => {
    await expect(
      showComment.execute({
        id: 'non-existing-comment-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
