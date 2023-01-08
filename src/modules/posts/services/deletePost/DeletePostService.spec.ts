import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import AppError from '@shared/errors/AppError';

import FakePostRepository from '@modules/posts/repositories/fakes/FakePostsRepository';
import DeletePostServices from './DeletePostService';

let fakePostRepository: FakePostRepository;
let fakeCacheProvider: FakeCacheProvider;
let deletePost: DeletePostServices;

describe('DeletePostService', () => {
  beforeEach(() => {
    fakePostRepository = new FakePostRepository();
    fakeCacheProvider = new FakeCacheProvider();

    deletePost = new DeletePostServices(fakePostRepository, fakeCacheProvider);
  });

  it('should be able to delete a new post', async () => {
    const post = await fakePostRepository.create({
      title: 'post',
      description: 'This is a post',
      slug: 'post',
    });

    await deletePost.execute({ id: post.id });

    const deletedPost = await fakePostRepository.findBy({ id: post.id });

    expect(deletedPost).toBe(null);
  });

  it('should return App error', async () => {
    await expect(deletePost.execute({})).rejects.toBeInstanceOf(AppError);
  });
});
