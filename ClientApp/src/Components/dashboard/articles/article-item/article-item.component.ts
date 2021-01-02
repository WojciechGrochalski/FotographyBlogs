import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Article } from '../../../../models/Article'
import { Router} from '@angular/router'
import {ArticlesService} from '../../../../Services/Articles.service';

@Component({
  selector: 'app-article-item',
  templateUrl: './article-item.component.html',
  styleUrls: ['./article-item.component.css']
})
export class ArticleItemComponent implements OnInit {

  @Input() article: Article;


  constructor(
    private router: Router,
    private articleService: ArticlesService) { }

  ngOnInit() {
  }


  RouteToEdit( article: Article) {
    this.articleService.RouteTOArticleOB(article,'dashboard/edytuj-artykul');
  }
  RouteToArticle( article: Article) {
    this.articleService.RouteTOArticleOB(article,'detail');
  }
  deleteArticle(article: Article) {
    this.articleService.DeleteArticle(article.ID);
    window.location.reload();
  }
}
