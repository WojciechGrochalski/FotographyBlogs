import { Component, OnInit } from '@angular/core';
import { ArticleService } from 'src/app/services/article.service';
import { Article } from '../../../models/Article'

@Component({
  selector: 'app-articles-featured',
  templateUrl: './articles-featured.component.html',
  styleUrls: ['./articles-featured.component.css']
})
export class ArticlesFeaturedComponent implements OnInit {

  mostViewArticles: Article[]

  constructor(
    private articleService: ArticleService
  ) { }

  ngOnInit() {
    this.articleService.getFeaturedArticles().subscribe(articles => this.mostViewArticles = articles)
  }

}
