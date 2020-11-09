import { Injectable } from '@angular/core';
import {Router, NavigationStart, ActivatedRoute} from '@angular/router';
import { filter } from 'rxjs/operators';
import {Observable} from 'rxjs';
import {Article} from '../forum/forum.component';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private router: Router, private route: ActivatedRoute) { }

  articleToSend: Article;

  RouteTOArticle(article: string) {
   this.router.navigate(['article-template', {content: article}]);
  }

  RouteTOArticleOB(article: Article) {
    this.router.navigate(['article-template']);
    this.articleToSend = article;
  }

  GetArticle( ): any {
    const articleObserve = new Observable(observe => {
      setTimeout(() => {
        observe.next(this.articleToSend);
      }, 200);
    });
    return articleObserve;
  }
}
