import FakePostRepository from '@modules/posts/repositories/fakes/FakePostsRepository';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import ListPostService from './ListPostService';

let fakePostRepository: FakePostRepository;
let listPost: ListPostService;
let fakeCacheProvider: FakeCacheProvider;

describe('ListPostService', () => {
  beforeEach(() => {
    fakePostRepository = new FakePostRepository();
    fakeCacheProvider = new FakeCacheProvider();

    listPost = new ListPostService(fakePostRepository, fakeCacheProvider);
  });

  it('should be able to list all the posts', async () => {
    const post01 = await fakePostRepository.create({
      title: 'post 1',
      description: 'This is a post',
      slug: 'post-1',
    });

    const post02 = await fakePostRepository.create({
      title: 'post 2',
      description: 'This is a post',
      slug: 'post-2',
    });

    const postList = await listPost.execute(1, 2);

    expect(postList.data.list).toEqual([post01, post02]);
  });

  it('should be able to list all the posts using cache', async () => {
    const post01 = await fakePostRepository.create({
      title: 'post 1',
      description: 'This is a post',
      slug: 'post-1',
    });

    const post02 = await fakePostRepository.create({
      title: 'post 2',
      description: 'This is a post',
      slug: 'post-2',
    });

    await listPost.execute(1, 2);

    const postList = await listPost.execute(1, 2);

    expect(postList.data.list).toEqual([post01, post02]);
  });

  it('should be able to list the posts with the specified pagination', async () => {
    const post01 = await fakePostRepository.create({
      title: 'post 1',
      description: 'This is a post',
      slug: 'post-1',
    });

    const post02 = await fakePostRepository.create({
      title: 'post 2',
      description: 'This is a post',
      slug: 'post-2',
    });

    await fakePostRepository.create({
      title: 'post 3',
      description: 'This is a post',
      slug: 'post-3',
    });

    const postList01 = await listPost.execute(1, 1);

    expect(postList01.data.list).toEqual([post01]);

    const postList02 = await listPost.execute(1, 2);
    expect(postList02.data.list).toEqual([post01, post02]);
  });
});
