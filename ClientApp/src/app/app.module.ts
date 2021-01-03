import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import {NavComponent} from '../Components/nav/nav.component';
import {AboutComponent} from '../Components/about/about.component';
import {FooterComponent} from '../Components/footer/footer.component';
import {HomeComponent} from '../Components/home/home.component';

import {ForumComponent} from '../Components/forum/forum.component';
import {ArticleTemplateComponent} from '../Components/article-template/article-template.component';
import {LogInComponent} from '../Components/log-in/log-in.component';
import {RegistrationComponent} from '../Components/registration/registration.component';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {GalleryComponent} from '../Components/gallery/gallery.component';
import {BlogComponent} from '../Components/blog/blog.component';
import {ArticleDetailComponent} from '../Components/blog/article-detail/article-detail.component';
import {DashboardComponent} from '../Components/dashboard/dashboard.component';
import {NewArticleComponent} from '../Components/dashboard/new-article/new-article.component';
import {ProfileEditComponent} from '../Components/dashboard/profile-edit/profile-edit.component';
import {AlbumsComponent} from '../Components/dashboard/albums/albums.component';
import {ArticlesComponent} from '../Components/dashboard/articles/articles.component';

import {ArticleItemComponent} from '../Components/dashboard/articles/article-item/article-item.component';
import {EditArticleComponent} from '../Components/dashboard/edit-article/edit-article.component';
import {NewAlbumComponent} from '../Components/dashboard/new-album/new-album.component';
import {SingleAlbumComponent} from '../Components/dashboard/single-album/single-album.component';
import {ArticlesRecentComponent} from '../Components/blog/articles-recent/articles-recent.component';
import {ArticlesFeaturedComponent} from '../Components/blog/articles-featured/articles-featured.component';
import {IntroComponent} from '../Components/blog/intro/intro.component';
import {BlogNavComponent} from '../Components/blog-nav/blog-nav.component';
/////


import { NgxPaginationModule } from 'ngx-pagination'
import { CKEditorModule } from '@ckeditor/ckeditor5-angular'
import {FlashMessagesModule} from 'angular2-flash-messages'
import {RouterModule} from '@angular/router';
import {PostForumComponent} from '../Components/post-forum/post-forum.component';
import {PostComponent} from '../Components/post/post.component';
import {AlertComponent} from '../Components/alert/alert.component';
import {PostTemplateComponent} from '../Components/post-template/post-template.component';
import {PostItemComponent} from '../Components/dashboard/mypost/post-item/post-item.component';
import {MypostComponent} from '../Components/dashboard/mypost/mypost.component';
import {EditPostComponent} from '../Components/dashboard/edit-post/edit-post.component';
import { NewPostComponent } from '../Components/dashboard/new-post/new-post.component';




// BLOG COMPONENTS




@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    AboutComponent,
    HomeComponent,
    GalleryComponent,
    FooterComponent,
    ForumComponent,
    ArticleTemplateComponent,
    LogInComponent,
    PostForumComponent,
    RegistrationComponent,
    BlogComponent,
    BlogNavComponent,
    IntroComponent,
    ArticlesFeaturedComponent,
    ArticlesRecentComponent,
    ArticleDetailComponent,
    DashboardComponent,
    NewArticleComponent,
    ProfileEditComponent,
    PostComponent,
    AlbumsComponent,
    ArticlesComponent,
    ArticleItemComponent,
    EditArticleComponent,
    NewAlbumComponent,
    SingleAlbumComponent,
    AlertComponent,
    PostTemplateComponent,
    PostItemComponent,
    MypostComponent,
    EditPostComponent,
    NewPostComponent,

  ],
  imports: [
  BrowserModule,
  NgbModule,
  FormsModule,
  HttpClientModule,
  NgxPaginationModule,
  CKEditorModule,
  FlashMessagesModule.forRoot(),
  RouterModule.forRoot([
    {path: '', component: HomeComponent, pathMatch: 'full'},
    {path: 'about', component: AboutComponent },
    {path: 'gallery', component: GalleryComponent},
    {path: 'forum', component: ForumComponent},
    {path: 'pforum', component: PostForumComponent},
    {path: 'post-template', component: PostTemplateComponent},
    {path: 'article-template', component: ArticleTemplateComponent},
    {path: 'reg', component: RegistrationComponent},
    {path: 'log-in', component: LogInComponent},
    {path: 'blog', component: BlogComponent },
    // {path: 'detail', component: ArticleDetailComponent },
    {path: 'detail', component: ArticleDetailComponent },
    {path: 'dashboard', component: DashboardComponent, children: [
        {
          path: 'articles',
          component: ArticlesComponent
        },
        {
          path: 'new-article',
          component: NewArticleComponent
        },
        {
          path: 'edytuj-artykul',
          component: EditArticleComponent
        },
        {
          path: 'edit-profile',
          component: ProfileEditComponent
        },
        {
          path: 'albums',
          component: AlbumsComponent
        },
        {
          path: 'albums/new',
          component: NewAlbumComponent
        },
        {
          path: 'albums/album_id',
          component: SingleAlbumComponent
        },
        {
          path: 'edit-post',
          component: EditPostComponent
        },
        {
          path: 'mypost',
          component: MypostComponent
        },
        {
          path: 'new-post',
          component: NewPostComponent
        },


      ]
    }
  ]),
  ReactiveFormsModule
],
providers: [

],
  bootstrap: [AppComponent]
})
export class AppModule { }
