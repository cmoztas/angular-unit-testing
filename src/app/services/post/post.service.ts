import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Post} from '../../models/post.model';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(
    private http: HttpClient
  ) {
  }

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>('https://jsonplaceholder.typicode.com/posts');
  }

  getPost(postId: number): Observable<Post> {
    return this.http.get<Post>(`https://jsonplaceholder.typicode.com/posts/${postId}`);
  }

  deletePost(post: Post): Observable<Object> {
    return this.http.delete(`https://jsonplaceholder.typicode.com/posts/${post.id}`);
  }

  updatePost(post: Post): Observable<Post> {
    return this.http.patch<Post>(`https://jsonplaceholder.typicode.com/posts/${post.id}`, post);
  }
}
