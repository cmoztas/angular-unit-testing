import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {PostService} from '../../services/post/post.service';
import {Location} from '@angular/common';
import {Post} from '../../models/post.model';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss']
})
export class PostDetailComponent implements OnInit {
  post!: Post;

  constructor(
    private location: Location,
    private postService: PostService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.getPosts();
  }

  getPosts(): void {
    const id: string | null = this.route.snapshot.paramMap.get('id');
    id && this.postService.getPost(+id)
      .subscribe((post: Post): void => {
        this.post = post;
      });
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.postService.updatePost(this.post)
      .subscribe(() => this.goBack());
  }
}
