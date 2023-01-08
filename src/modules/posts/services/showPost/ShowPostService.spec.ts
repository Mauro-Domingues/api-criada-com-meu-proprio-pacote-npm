import AppError from '@shared/errors/AppError';
import FakePostRepository from '@modules/posts/repositories/fakes/FakePostsRepository';
import ShowPostService from './ShowPostService';

let fakePostRepository: FakePostRepository;
let showPost: ShowPostService;

describe('ShowPostService', () => {
  beforeEach(() => {
    fakePostRepository = new FakePostRepository();

    showPost = new ShowPostService(fakePostRepository);
  });

  it('should be able to show the post', async () => {
    const post = await fakePostRepository.create({
      title: 'post',
      description: 'This is a post',
      slug: 'post',
    });

    const getPost = await showPost.execute({
      id: post.id,
    });

    expect(getPost.data).toHaveProperty('id');
    expect(getPost.data).toEqual(post);
  });

  it('should not be able to show posts with a non-existing id', async () => {
    await expect(
      showPost.execute({
        id: 'non-existing-post-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
