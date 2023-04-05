import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {StrengthPipe} from './pipes/strength/strength.pipe';
import {PostsComponent} from './components/posts/posts.component';
import {HttpClientModule} from '@angular/common/http';
import { PostComponent } from './components/post/post.component';
import {RouterLink} from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    StrengthPipe,
    PostsComponent,
    PostComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterLink
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
