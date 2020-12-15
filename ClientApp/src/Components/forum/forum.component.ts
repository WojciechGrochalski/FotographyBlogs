import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Article} from '../../models/Article';
import {ArticleService} from '../../Services/article.service';



@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class ForumComponent implements  OnInit {
  public articles: Article[] = [];
  public article = {} as Article;

  constructor(
    private http: HttpClient,
    private articleService: ArticleService ) {}

  ngOnInit(): void {

    this.articleService.GetArticleFromDB().subscribe(res =>{
      this.articles=res;
    });
  }

  RouteToArticleOB( article: Article) {
     this.articleService.RouteTOArticleOB(article);
  }
}
