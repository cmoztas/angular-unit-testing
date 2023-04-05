import {Component, OnInit} from '@angular/core';
import {Post} from '../../models/post.model';
import {PostService} from '../../services/post/post.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
  posts: Post[] = [];

  constructor(
    private postService: PostService
  ) {
  }

  ngOnInit(): void {
    this.getPosts();
  }

  getPosts(): void {
    this.postService.getPosts().subscribe((posts: Post[]): void => {
      this.posts = posts;
    });
  }

  delete(post: Post): void {
    this.posts = this.posts.filter((p: Post): boolean => p.id !== post.id);
    this.postService.deletePost(post).subscribe();
  }
}
