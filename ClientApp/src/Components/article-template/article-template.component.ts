import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {ArticleService} from '../../Services/article.service';
import {Article} from '../../models/Article';

@Component({
  selector: 'app-article-template',
  templateUrl: './article-template.component.html',
  styleUrls: ['./article-template.component.css']
})
export class ArticleTemplateComponent implements OnInit {

  constructor(private route: ActivatedRoute, private articleService: ArticleService) { }
  Content={ } as Article;
  ngOnInit(): void {
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
