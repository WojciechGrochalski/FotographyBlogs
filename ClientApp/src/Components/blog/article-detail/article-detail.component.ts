import { Component, OnInit } from '@angular/core';
import { ArticlesService } from '../../../Services/Articles.service'
import { ActivatedRoute } from '@angular/router'
import {Article} from '../../../models/Article'

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.css']
})
export class ArticleDetailComponent implements OnInit {

  article: Article;
  id: number;
  constructor(
    private route: ActivatedRoute,
    private articleService: ArticlesService  ) { }

  async  ngOnInit() {

    const articleObservable = this.articleService.GetArticle();
    articleObservable.subscribe((res: Article) => {
      if(res) {
        this.article = res;
        this.article.View =this.article.View+1;
        console.log(res);
        this.articleService.EditArticle(this.article).subscribe();
        sessionStorage.setItem('content',JSON.stringify(res) );
      }
      else{
        this.article= JSON.parse(sessionStorage.getItem('content')) ;
      }
    });

  }

  getArticleImage(): string{
    return this.article.Img;

  }

}
