import {Component, OnInit, ViewEncapsulation} from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { ForumService } from 'src/app/forum.service';
import {Route} from '@angular/router';
import {ArticleService} from '../app/article.service';
import {Observable} from 'rxjs';


export class Article {
  ID: number;
  Tittle: string;
  Content: string;
  Date: string;
  img: string[];
  constructor( id: number, tittle: string, content: string, date: string, img: string[]) {
    this.ID = id;
    this.Tittle = tittle;
    this.Content = content;
    this.Date = date;
    this.img = img;
  }
}

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class ForumComponent implements Article, OnInit {
  img: string[] = [];
  public Listartice: Article[] = [];
  public article = {} as Article;
  text: string;
  date: string;
  contents: string;
  id: number;

  constructor(private http: HttpClient, private forumservice: ForumService,  private  articleService: ArticleService) {}

  ID: number;
  Tittle: string;
  Content: string;
  Date: string;




  ngOnInit(): void {

    this.forumservice.GetArticle().subscribe(res =>{
      this.Listartice=res;
    });



  }




  RouteToArticleOB( article: Article) {
     this.articleService.RouteTOArticleOB(article);
  }


}
