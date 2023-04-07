import {PostService} from './post.service';
import {HttpClient} from '@angular/common/http';
import {Post} from '../../models/post.model';
import {of} from 'rxjs';

describe('Post Service', (): void => {
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let postService: PostService;
  const POSTS: Post[] = [
    {id: 1, title: 'title 1', description: 'body 1'},
    {id: 2, title: 'title 2', description: 'body 2'},
    {id: 3, title: 'title 3', description: 'body 3'}
  ];

  beforeEach((): void => {

    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    postService = new PostService(httpClientSpy);
  });

  describe('getPosts()', (): void => {
    it('should return expected posts when it is called', (done: DoneFn): void => {
      httpClientSpy.get.and.returnValue(of(POSTS));
      postService.getPosts().subscribe({
        next: (posts: Post[]): void => {
          setTimeout((): void => {
            expect(posts).toEqual(POSTS);
            done();
          }, 200);
        },
        error: (): void => {
          done.fail();
        }
      });
      expect(httpClientSpy.get).toHaveBeenCalledTimes(1);
    });
  });
});
