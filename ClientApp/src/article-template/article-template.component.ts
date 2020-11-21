import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import {Article} from '../forum/forum.component';
import {ForumService} from '../app/forum.service';
import {ArticleService} from '../app/article.service';
@Component({
  selector: 'app-article-template',
  templateUrl: './article-template.component.html',
  styleUrls: ['./article-template.component.css']
})
export class ArticleTemplateComponent implements OnInit {

  constructor(private route: ActivatedRoute, private articleService: ArticleService) { }
  Content: Article;
  ngOnInit(): void {
    //this.Content = this.route.snapshot.paramMap.get('content');
    const articleObservable = this.articleService.GetArticle();

      articleObservable.subscribe((res: Article) => {
        if(res) {
          this.Content = res;
          sessionStorage.setItem('content',JSON.stringify(res) );
        }
        else{
          this.Content= JSON.parse(sessionStorage.getItem('content')) ;
        }
      });


  }

}
