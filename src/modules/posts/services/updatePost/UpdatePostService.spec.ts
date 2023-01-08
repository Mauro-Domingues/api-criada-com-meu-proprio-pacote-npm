import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import AppError from '@shared/errors/AppError';

import FakePostRepository from '@modules/posts/repositories/fakes/FakePostsRepository';
import UpdatePostService from './UpdatePostService';

let fakePostRepository: FakePostRepository;
let fakeCacheProvider: FakeCacheProvider;
let updatePostService: UpdatePostService;

describe('UpdatePostService', () => {
  beforeEach(() => {
    fakePostRepository = new FakePostRepository();
    fakeCacheProvider = new FakeCacheProvider();

    updatePostService = new UpdatePostService(
      fakePostRepository,
      fakeCacheProvider,
    );
  });

  it('should update the post', async () => {
    const post = await fakePostRepository.create({
      title: 'post',
      description: 'This is a post',
      slug: 'post',
    });

    const updatedPost = await updatePostService.execute(
      { id: post.id },
      {
        title: 'updatedPost',
        description: 'This is a updatedpost',
        slug: 'post',
      },
    );

    expect(updatedPost.data.title).toEqual('updatedPost');
  });

  it('should return App Error', async () => {
    await expect(
      updatePostService.execute({}, { title: '', description: '', slug: '' }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
