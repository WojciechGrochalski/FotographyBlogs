import { Component, OnInit } from '@angular/core';
import { Article } from '../../../models/Article'
import { ArticlesService } from '../../../Services/Articles.service'

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {

  articles: Article[];

  constructor(
    private articleService: ArticlesService
  ) { }

  async ngOnInit() {

    this.articles= await this.articleService.getUserArticles(sessionStorage.getItem('userName')).toPromise();
    localStorage.setItem('articles', JSON.stringify(this.articles))
    this.articles = JSON.parse(localStorage.getItem('articles'))
  }

  deleteArticle(article: Article) {
   this.articleService.DeleteArticle(article.ID);
  }

}
