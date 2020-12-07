import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import {NavComponent} from '../Components/nav/nav.component';
import {AboutComponent} from '../Components/about/about.component';
import {FooterComponent} from '../Components/footer/footer.component';
import {HomeComponent} from '../Components/home/home.component';

import {ForumComponent} from '../Components/forum/forum.component';
import {ArticleTemplateComponent} from '../Components/article-template/article-template.component';
import {LogInComponent} from '../Components/log-in/log-in.component';
import {RegistrationComponent} from '../Components/registration/registration.component';
import {AlertComponent} from '../Components/alert/alert.component';
import {PostForumComponent} from '../Components/post-forum/post-forum.component';
import {PostTemplateComponent} from '../Components/post-template/post-template.component';
import {PostComponent} from '../Components/post/post.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { CommentComponent } from './comment/comment.component';




@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    AboutComponent,
    HomeComponent,
    FooterComponent,
    ForumComponent,
    ArticleTemplateComponent,
    LogInComponent,
    RegistrationComponent,
    AlertComponent,
    PostForumComponent,
    PostTemplateComponent,
    PostComponent,
    CommentComponent,
  ],
  imports: [
    BrowserModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      {path: '', component: HomeComponent, pathMatch: 'full'},
      {path: 'about', component: AboutComponent},
      {path: 'forum', component: ForumComponent},
      {path: 'article-template', component: ArticleTemplateComponent},
      {path: 'reg', component: RegistrationComponent},
      {path: 'log-in', component: LogInComponent},
      {path: 'post-forum', component: PostForumComponent},
      {path: 'post-template', component: PostTemplateComponent}
    ]),

    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
