import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AboutComponent } from '../about/about.component';
import { NavComponent } from '../nav/nav.component';
import { ContactComponent } from '../contact/contact.component';
import {HomeComponent} from '../home/home.component';
import { FooterComponent } from '../footer/footer.component';
import { ForumComponent } from '../forum/forum.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ArticleTemplateComponent} from '../article-template/article-template.component';
import { LogInComponent } from './log-in/log-in.component';
import { RegistrationComponent } from './registration/registration.component';
import { AlertComponent } from './alert/alert.component';
import {PostForumComponent} from '../post-forum/post-forum.component';
import { PostTemplateComponent } from './post-template/post-template.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    AboutComponent,
    ContactComponent,
    HomeComponent,
    FooterComponent,
    ForumComponent,
    ArticleTemplateComponent,
    LogInComponent,
    RegistrationComponent,
    AlertComponent,
    PostForumComponent,
    PostTemplateComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      {path: '', component: HomeComponent, pathMatch: 'full'},
      {path: 'about', component: AboutComponent},
      {path: 'contact', component: ContactComponent},
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
