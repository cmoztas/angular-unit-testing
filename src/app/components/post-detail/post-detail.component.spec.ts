import {ComponentFixture, TestBed} from '@angular/core/testing';
import {PostDetailComponent} from './post-detail.component';
import {Location} from '@angular/common';
import {PostService} from '../../services/post/post.service';
import {ActivatedRoute} from '@angular/router';
import {of} from 'rxjs';
import {Post} from '../../models/post.model';
import {By} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';

describe('Post Detail Component', (): void => {
  let fixture: ComponentFixture<PostDetailComponent>;
  let mockPostService: jasmine.SpyObj<PostService>;

  beforeEach((): void => {
    let mockLocation = jasmine.createSpyObj(['back']);
    mockPostService = jasmine.createSpyObj(['getPost', 'updatePost']);
    let mockActivatedRoute = {
      snapshot: {
        paramMap: {
          get: (): string => {
            return '3';
          }
        }
      }
    }

    TestBed.configureTestingModule({
      declarations: [PostDetailComponent],
      providers: [
        {provide: Location, useValue: mockLocation},
        {provide: PostService, useValue: mockPostService},
        {provide: ActivatedRoute, useValue: mockActivatedRoute},
      ],
      imports: [FormsModule]
    });

    fixture = TestBed.createComponent(PostDetailComponent);
  });

  it('should render the post title in h2 template', (): void => {
    mockPostService.getPost.and.returnValue(of({
        id: 1,
        userId: 1,
        title: 'Title 1',
        body: 'Body 1'
      } as Post)
    );

    fixture.detectChanges();
    const element: HTMLElement = fixture.debugElement.query(By.css('h2')).nativeElement as HTMLElement;
    expect(element.textContent).toBe(fixture.componentInstance.post.title);
  })
});
