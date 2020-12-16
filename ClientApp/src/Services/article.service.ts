import {Inject, Injectable} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Article } from '../models/Article';
import { Post } from '../models/Post';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  baseUrl: string = '';
  articleToSend: Article;

  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  RouteTOArticleOB(article: Article) {
    this.router.navigate(['article-template']);
    this.articleToSend = article;
  }

  GetArticle(): any {
    const articleObserve = new Observable(observe => {
      setTimeout(() => {
        observe.next(this.articleToSend);
      }, 200);
    });
    return articleObserve;
  }

  GetArticles(): Observable<any> {
    return this.http.get(this.baseUrl + 'api/File/Article');

  }
  AddArticle(article: Article): Observable<any> {
    return this.http.post(this.baseUrl + 'api/File/Article',article);

  }

  SearchForArticle(keyword: string): Observable<any>{
    return this.http.get(this.baseUrl + 'api/File/Article/' + keyword);
  }

}
