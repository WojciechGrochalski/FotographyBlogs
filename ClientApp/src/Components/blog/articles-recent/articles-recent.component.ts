import { Component, OnInit } from '@angular/core';
import {Article} from '../../../models/Article'
import { ArticlesService } from '../../../Services/Articles.service'

@Component({
  selector: 'app-articles-recent',
  templateUrl: './articles-recent.component.html',
  styleUrls: ['./articles-recent.component.css']
})
export class ArticlesRecentComponent implements OnInit {

  public articles: Article[];

  public config;
  public maxSize: number = 4;
  public autoHide: boolean = true;
  public responsive: boolean = true;
  public labels: any = {
    previousLabel: '',
    nextLabel: ''
  }

  constructor(private articleService: ArticlesService) {}

  async ngOnInit() {
    this.articles= await this.articleService.GetArticles().toPromise();
     this.config = {
           itemsPerPage: 3,
           currentPage: 1,
           totalItems: this.articles.length
         };


  }

  pageChanged(event) {
    this.config.currentPage = event;
  }
  RouteToArticleOB( article: Article) {
    this.articleService.RouteTOArticleOB(article,'detail');
  }

}
