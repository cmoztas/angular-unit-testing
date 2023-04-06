import {Post} from '../../models/post.model';
import {PostsComponent} from './posts.component';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {PostService} from '../../services/post/post.service';
import {of} from 'rxjs';
import {Component, Input} from '@angular/core';

describe('Posts Component', (): void => {
  let POSTS: Post[];
  let component: PostsComponent;
  let mockPostsService: any;
  let fixture: ComponentFixture<PostsComponent>;

  @Component({
    selector: 'app-post',
    template: '<div></div>'
  })
  class FakePostComponent {
    @Input() post: Post | null = null;
  }

  beforeEach((): void => {
    POSTS = [
      {id: 1, title: 'title 1', description: 'body 1'},
      {id: 2, title: 'title 2', description: 'body 2'},
      {id: 3, title: 'title 3', description: 'body 3'}
    ];

    mockPostsService = jasmine.createSpyObj(['getPosts', 'deletePost']);

    TestBed.configureTestingModule({
      declarations: [PostsComponent, FakePostComponent],
      providers: [
        {
          provide: PostService,
          useValue: mockPostsService
        }
      ]
    });

    fixture = TestBed.createComponent(PostsComponent);
    component = fixture.componentInstance;
  });

  it('should set posts from the service directly', (): void => {
    mockPostsService.getPosts.and.returnValue(of(POSTS));
    fixture.detectChanges();
    expect(component.posts.length).toBe(3);
  })

  describe('delete', (): void => {
    beforeEach((): void => {
      mockPostsService.deletePost.and.returnValue(of(true));
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
      component.delete(POSTS[1]);
      expect(mockPostsService.deletePost).toHaveBeenCalledTimes(1);
    });
  });
});
