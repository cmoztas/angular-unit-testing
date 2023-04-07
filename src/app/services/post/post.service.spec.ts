import {PostService} from './post.service';
import {HttpClient} from '@angular/common/http';
import {Post} from '../../models/post.model';
import {of} from 'rxjs';
import {TestBed} from '@angular/core/testing';

describe('Post Service', (): void => {
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let postService: PostService;
  const POSTS: Post[] = [
    {id: 1, userId: 1, title: 'title 1', body: 'body 1'},
    {id: 2, userId: 1, title: 'title 2', body: 'body 2'},
    {id: 3, userId: 1, title: 'title 3', body: 'body 3'}
  ];

  beforeEach((): void => {
    let httpClientSpyObj = jasmine.createSpyObj('HttpClient', ['get']);

    TestBed.configureTestingModule({
      providers: [
        PostService,
        {provide: HttpClient, useValue: httpClientSpyObj}
      ]
    });

    postService = TestBed.inject(PostService);
    httpClientSpy = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;
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
