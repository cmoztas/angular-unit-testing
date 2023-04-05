import {Post} from '../../models/post.model';
import {PostsComponent} from './posts.component';
import {of} from 'rxjs';
import {TestBed} from '@angular/core/testing';
import {PostService} from '../../services/post/post.service';

class MockPostsService {
  getPosts() {};
  deletePost() {
    return of({});
  };
}

describe('Posts Component', (): void => {
  let POSTS: Post[];
  let component: PostsComponent;
  let postService: any;

  beforeEach((): void => {
    POSTS = [
      {
        id: 1,
        title: 'title 1',
        description: 'body 1'
      },
      {
        id: 2,
        title: 'title 2',
        description: 'body 2'
      },
      {
        id: 3,
        title: 'title 3',
        description: 'body 3'
      }
    ]

    TestBed.configureTestingModule({
      providers: [
        PostsComponent,
        {
          provide: PostService,
          useClass: MockPostsService}
      ]
    });

    component = TestBed.inject(PostsComponent);
    postService = TestBed.inject(PostService);
  });

  describe('delete', (): void => {
    beforeEach((): void => {
      component.posts = POSTS;
    });

    it('should delete the selected Post from the posts', (): void => {
      component.delete(POSTS[1]);
      expect(component.posts.length).toBe(2);
    });

    it('should delete the actual selected Post in posts', (): void => {
      component.delete(POSTS[1]);

      for (let post of component.posts) {
        expect(post).not.toEqual(POSTS[1]);
      }
    });

    it('should call the delete method in Post Service only once', (): void => {
      spyOn(postService, 'deletePost').and.callThrough();
      component.delete(POSTS[1]);
      expect(postService.deletePost).toHaveBeenCalledTimes(1);
    });
  });
})
