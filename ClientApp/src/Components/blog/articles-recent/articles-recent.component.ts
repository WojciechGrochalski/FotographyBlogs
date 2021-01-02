import { Component, OnInit } from '@angular/core';
import {Article} from '../../../models/Article'
import { ArticleService } from '../../../services/article.service'

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

  constructor(private articleService: ArticleService) {}

  ngOnInit() {
    this.articleService.getArticles().subscribe(articles => this.articles = articles)
    this.config = {
      itemsPerPage: 3,
      currentPage: 1,
      totalItems: this.articles.length
    };
  }

  pageChanged(event) {
    this.config.currentPage = event;
  }

}
