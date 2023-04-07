import {Post} from '../../models/post.model';
import {PostsComponent} from './posts.component';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {PostService} from '../../services/post/post.service';
import {of} from 'rxjs';
import {DebugElement} from '@angular/core';
import {By} from '@angular/platform-browser';
import {PostComponent} from '../post/post.component';
import {RouterTestingModule} from '@angular/router/testing';

describe('Posts Component', (): void => {
  let POSTS: Post[];
  let component: PostsComponent;
  let mockPostsService: any;
  let fixture: ComponentFixture<PostsComponent>;

  beforeEach((): void => {
    POSTS = [
      {id: 1, userId: 1, title: 'title 1', body: 'body 1'},
      {id: 2, userId: 1, title: 'title 2', body: 'body 2'},
      {id: 3, userId: 1, title: 'title 3', body: 'body 3'}
    ];

    mockPostsService = jasmine.createSpyObj(['getPosts', 'deletePost']);

    TestBed.configureTestingModule({
      declarations: [
        PostsComponent,
        PostComponent
      ],
      imports: [RouterTestingModule.withRoutes([])],
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

  it('should create exact same number of Post Component with Posts', (): void => {
    mockPostsService.getPosts.and.returnValue(of(POSTS));
    // ngOnInit()
    fixture.detectChanges();

    const postComponentDEs: DebugElement[] = fixture.debugElement.queryAll(By.directive(PostComponent));
    expect(postComponentDEs.length).toEqual(3);
  });

  it('should check whether exact post is sending to Post Component', () => {
    mockPostsService.getPosts.and.returnValue(of(POSTS));
    fixture.detectChanges();
    const postComponentDEs: DebugElement[] = fixture.debugElement.queryAll(By.directive(PostComponent));

    for (let i = 0; i < postComponentDEs.length; i++) {
      let postComponentInstance: PostComponent = postComponentDEs[i].componentInstance as PostComponent;
      expect(postComponentInstance.post!.title).toEqual(POSTS[i].title);
    }
  });

  it('should set posts from the service directly', (): void => {
    mockPostsService.getPosts.and.returnValue(of(POSTS));
    fixture.detectChanges();
    expect(component.posts.length).toBe(3);
  });

  it('should create one post child Element for each post', (): void => {
    mockPostsService.getPosts.and.returnValue(of(POSTS));
    fixture.detectChanges();
    const debugElement: DebugElement = fixture.debugElement;
    const postElements: DebugElement[] = debugElement.queryAll(By.css('.post'));
    expect(postElements.length).toBe(POSTS.length);
  });

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

    it('should call delete method when post component button is clicked', (): void => {
      spyOn(component, 'delete');
      mockPostsService.getPosts.and.returnValue(of(POSTS));
      fixture.detectChanges();

      const postComponentDEs: DebugElement[] = fixture.debugElement.queryAll(By.directive(PostComponent));

      for (let i: number = 0; i < postComponentDEs.length; i++) {
        postComponentDEs[i]
          .query(By.css('button'))
          .triggerEventHandler('click', {
            preventDefault: () => {
            }
          });

        expect(component.delete).toHaveBeenCalledWith(POSTS[i]);
      }
    });
  });
});
