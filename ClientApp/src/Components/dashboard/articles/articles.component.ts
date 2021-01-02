import { Component, OnInit } from '@angular/core';
import { Article } from '../../../models/Article'
import { ArticleService } from '../../../services/article.service'

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {

  articles: Article[];

  constructor(
    private articleService: ArticleService
  ) { }

  ngOnInit() {
    this.articleService.getUserArticles('Sam Smith').subscribe(articles => {
      localStorage.setItem('articles', JSON.stringify(articles))
    })
    this.articles = JSON.parse(localStorage.getItem('articles'))
  }

  deleteArticle(article: Article) {
    this.articleService.deleteArticle(article.id);
    this.articles = this.articles.filter(a => a.id !== article.id);
    localStorage.setItem('articles', JSON.stringify(this.articles))
  }

}
