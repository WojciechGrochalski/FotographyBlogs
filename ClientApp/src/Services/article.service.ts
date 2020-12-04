import { Injectable } from '@angular/core';
import {Router, NavigationStart, ActivatedRoute} from '@angular/router';
import { filter } from 'rxjs/operators';
import {Observable} from 'rxjs';
import {Article} from '../forum/forum.component';
import {Post} from '../post-forum/post-forum.component';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private router: Router, private route: ActivatedRoute) { }

  articleToSend: Article;
  post: Post

  RouteTOArticle(article: string) {
   this.router.navigate(['article-template', {content: article}]);
  }

  RouteTOArticleOB(article: Article) {
    this.router.navigate(['article-template']);
    this.articleToSend = article;
  }

  RouteToPost(post: Post) {
    this.router.navigate(['post-template']);
    this.post=post;
  }

  GetArticle( ): any {
    const articleObserve = new Observable(observe => {
      setTimeout(() => {
        observe.next(this.articleToSend);
      }, 200);
    });
    return articleObserve;
  }
  GetPost( ): any {
    const postObserve = new Observable(observe => {
      setTimeout(() => {
        observe.next(this.post);
      }, 300);
    });
    return postObserve;
  }
}
