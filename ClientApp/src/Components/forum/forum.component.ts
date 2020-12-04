import {Component, OnInit, ViewEncapsulation} from '@angular/core';

import { HttpClient } from '@angular/common/http';
import {Article} from '../../models/Article';
import {ForumService} from '../../Services/forum.service';
import {ArticleService} from '../../Services/article.service';





@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class ForumComponent implements  OnInit {
  img: string[] = [];
  public Listartice: Article[] = [];
  public article = {} as Article;
  text: string;
  date: string;
  contents: string;
  id: number;

  constructor(private http: HttpClient, private forumservice: ForumService,  private  articleService: ArticleService) {}

  ngOnInit(): void {

    this.forumservice.GetArticle().subscribe(res =>{
      this.Listartice=res;
    });

  }


  RouteToArticleOB( article: Article) {
     this.articleService.RouteTOArticleOB(article);
  }


}
