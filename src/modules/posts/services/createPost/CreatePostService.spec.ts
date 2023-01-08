import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';

import FakePostRepository from '@modules/posts/repositories/fakes/FakePostsRepository';
import CreatePostServices from './CreatePostService';

let fakePostRepository: FakePostRepository;
let fakeCacheProvider: FakeCacheProvider;
let createPost: CreatePostServices;

describe('CreatePostService', () => {
  beforeEach(() => {
    fakePostRepository = new FakePostRepository();
    fakeCacheProvider = new FakeCacheProvider();

    createPost = new CreatePostServices(fakePostRepository, fakeCacheProvider);
  });

  it('should be able to create a new post', async () => {
    const post = await createPost.execute({
      title: 'post',
      description: 'This is a post',
      slug: 'post',
    });

    expect(post.data).toHaveProperty('id');
  });
});
