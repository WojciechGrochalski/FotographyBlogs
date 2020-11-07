import { Injectable } from '@angular/core';
import {Router, NavigationStart, ActivatedRoute} from '@angular/router';
import { filter } from 'rxjs/operators';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private router: Router, private route: ActivatedRoute) { }




  RouteTOArticle(article: string) {
   this.router.navigate(['article-template', {content: article}]);
  }
}
