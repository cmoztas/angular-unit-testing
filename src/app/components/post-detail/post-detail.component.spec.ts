import {ComponentFixture, TestBed} from '@angular/core/testing';
import {PostDetailComponent} from './post-detail.component';
import {Location} from '@angular/common';
import {PostService} from '../../services/post/post.service';
import {ActivatedRoute} from '@angular/router';

describe('Post Detail Component', (): void => {
  let fixture: ComponentFixture<PostDetailComponent>;

  let mockLocation = jasmine.createSpyObj(['back']);
  let mockPostService = jasmine.createSpyObj(['getPost', 'updatePost']);
  let mockActivatedRoute = {
    snapshot: {
      paramMap: {
        get: (): string => {
          return '3';
        }
      }
    }
  }

  beforeEach((): void => {
    TestBed.configureTestingModule({
      declarations: [PostDetailComponent],
      providers: [
        {provide: Location, useValue: mockLocation},
        {provide: PostService, useValue: mockPostService},
        {provide: ActivatedRoute, useValue: mockActivatedRoute},
      ]
    });

    fixture = TestBed.createComponent(PostDetailComponent);
  });
});
