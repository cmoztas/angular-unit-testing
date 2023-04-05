import {PostComponent} from './post.component';
import {Post} from '../../models/post.model';
import {first} from 'rxjs';

describe('Post Component', (): void => {
  it('should raise and event when the delete post is clicked', (): void => {
    const component: PostComponent = new PostComponent();
    const post: Post = {id: 1, title: 'Title 1', description: 'Description 1'};
    component.post = post;

    component.delete.pipe(first())
      .subscribe((selectedPost: Post): void => {
        expect(selectedPost).toEqual(post);
      });

    component.onDeletePost(new MouseEvent('click'));
  });
});
