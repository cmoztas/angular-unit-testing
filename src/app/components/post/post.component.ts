import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Post} from '../../models/post.model';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent {
  @Input() post: Post | null = null;
  @Output() delete: EventEmitter<Post> = new EventEmitter<Post>();

  onDeletePost(event: Event): void {
    event.stopPropagation();
    this.delete.emit(this.post!);
  }
}
