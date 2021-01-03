import {Inject, Injectable} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Article } from '../models/Article';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {
  baseUrl: string = '';
  articleToSend: Article;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient,
    @Inject('BASE_URL') baseUrl: string ) {
    this.baseUrl = baseUrl;
  }

  RouteTOArticleOB(article: Article, path: string) {
    this.router.navigate([path]);
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
  GetArticleWithID(id: number) {
    return this.http.get<any>(this.baseUrl + 'api/Articles/one/'+id);

  }
  GetArticles(): Observable<any> {
    return this.http.get(this.baseUrl + 'api/Articles');

  }
  GetFeaturedArticles(): Observable<any>{
    return this.http.get(this.baseUrl + 'api/Articles/Featured');
  }
  AddArticle(article: Article): Observable<any> {
    return this.http.post(this.baseUrl + 'api/Articles', article);

  }

  SearchForArticle(keyword: string): Observable<any>{
    return this.http.get(this.baseUrl + 'api/Articles/key/' + keyword);
  }
  EditArticle(article: Article): Observable<any>{

     return this.http.post(this.baseUrl + 'api/Articles/edit', article);
  }
  getUserArticles(user: Number): Observable<any>{
    return this.http.get(this.baseUrl + 'api/Articles/user/'+user);
  }
  DeleteArticle(id: number){
    return this.http.delete(this.baseUrl + 'api/Articles/delete/'+id).subscribe();
  }
}
