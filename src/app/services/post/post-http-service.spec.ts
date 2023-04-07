import {PostService} from './post.service';
import {TestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController, TestRequest} from '@angular/common/http/testing';
import {Post} from '../../models/post.model';

describe('postService (HttpClientTestingModule)', (): void => {
  let postService: PostService;
  let httpTestingController: HttpTestingController;
  const POSTS: Post[] = [
    {id: 1, userId: 1, title: 'title 1', body: 'body 1'},
    {id: 2, userId: 1, title: 'title 2', body: 'body 2'},
    {id: 3, userId: 1, title: 'title 3', body: 'body 3'}
  ];

  beforeEach((): void => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PostService],
    });

    postService = TestBed.inject(PostService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  describe('getPosts()', (): void => {
    it('should return posts when getPosts() is called', (done: DoneFn): void => {
      postService.getPosts().subscribe((data: Post[]): void => {
        expect(data).toEqual(POSTS);
        done();
      });

      const request: TestRequest = httpTestingController.expectOne('https://jsonplaceholder.typicode.com/posts');
      request.flush(POSTS);
      expect(request.request.method).toBe('GET');
    });
  });

  describe('getPost()', (): void => {
    it('should return single post when getPost() is called with postId', (): void => {
      postService.getPost(1).subscribe();
      const request: TestRequest = httpTestingController.expectOne('https://jsonplaceholder.typicode.com/posts/1');
      expect(request.request.method).toBe('GET');
    });
  });

  afterEach((): void => {
    httpTestingController.verify();
  })
});
