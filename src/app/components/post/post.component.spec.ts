import {PostComponent} from './post.component';
import {Post} from '../../models/post.model';
import {first} from 'rxjs';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';

describe('Post Component', (): void => {
  let fixture: ComponentFixture<PostComponent>;
  let component: PostComponent;

  beforeEach((): void => {
    TestBed.configureTestingModule({
      declarations: [PostComponent],
      imports: [RouterTestingModule.withRoutes([])]
    });

    fixture = TestBed.createComponent(PostComponent);
    component = fixture.componentInstance;
  });

  it('should create Post Component using TestBed', (): void => {
    expect(component).toBeDefined();
  });

  it('should render the post title in the anchor element', (): void => {
    const post: Post = {id: 1, title: 'Title 1', description: 'Description 1'};
    component.post = post;
    fixture.detectChanges();

    const postElement: HTMLElement = fixture.nativeElement;
    const a: HTMLElement | null = postElement.querySelector('a');

    expect(a?.textContent).toContain(post.title);
  });

  it('should raise and event when the delete post is clicked', (): void => {
    const post: Post = {id: 1, title: 'Title 1', description: 'Description 1'};

    component.post = post;

    component.delete.pipe(first())
      .subscribe((selectedPost: Post): void => {
        expect(selectedPost).toEqual(post);
      });

    component.onDeletePost(new MouseEvent('click'));
  });
});
