import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AboutComponent } from '../about/about.component';
import { ChrzcinyComponent } from '../chrzciny/chrzciny.component';
import { MonumentsComponent } from '../monuments/monuments.component';
import { SlubComponent } from '../slub/slub.component';
import { NavComponent } from '../nav/nav.component';
import { ContactComponent } from '../contact/contact.component';
import { TimetableComponent } from '../timetable/timetable.component';
import {HomeComponent} from '../home/home.component';

import { FooterComponent } from '../footer/footer.component';
import { ForumComponent } from '../forum/forum.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ArticleTemplateComponent} from '../article-template/article-template.component';
import { LogInComponent } from './log-in/log-in.component';
import { RegistrationComponent } from './registration/registration.component';
import { AlertComponent } from './alert/alert.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    AboutComponent,
    ChrzcinyComponent,
    MonumentsComponent,
    SlubComponent,
    ContactComponent,
    TimetableComponent,
    HomeComponent,
    FooterComponent,
    ForumComponent,
    ArticleTemplateComponent,
    LogInComponent,
    RegistrationComponent,
    AlertComponent,
  ],
  imports: [
    BrowserModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      {path: '', component: HomeComponent, pathMatch: 'full'},
      {path: 'about', component: AboutComponent},
      {path: 'slub', component: SlubComponent},
      {path: 'chrzciny', component: ChrzcinyComponent},
      {path: 'contact', component: ContactComponent},
      {path: 'monument', component: MonumentsComponent},
      {path: 'timetable', component: TimetableComponent},
      {path: 'forum', component: ForumComponent},
      {path: 'article-template', component: ArticleTemplateComponent},
      {path: 'reg', component: RegistrationComponent},
      {path: 'log-in', component: LogInComponent}
    ]),
   
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
