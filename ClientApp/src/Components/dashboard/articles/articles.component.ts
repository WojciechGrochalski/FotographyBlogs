import { Component, OnInit } from '@angular/core';
import { Article } from '../../../models/Article'
import { ArticlesService } from '../../../Services/Articles.service'
import {User} from '../../../models/User';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {

  articles: Article[];
  User: User;

  constructor(
    private articleService: ArticlesService
  ) { }

  async ngOnInit() {
    this.User = JSON.parse(sessionStorage.getItem('user'));
    this.articles= await this.articleService.getUserArticles(this.User.id).toPromise();
    localStorage.setItem('articles', JSON.stringify(this.articles))
    this.articles = JSON.parse(localStorage.getItem('articles'))
  }

  deleteArticle(article: Article) {
   this.articleService.DeleteArticle(article.ID);
  }

}
