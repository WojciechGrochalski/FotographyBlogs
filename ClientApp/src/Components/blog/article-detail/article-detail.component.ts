import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../../../services/article.service'
import { ActivatedRoute } from '@angular/router'
import {Article} from '../../../models/Article'

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.css']
})
export class ArticleDetailComponent implements OnInit {

  article: Article;

  constructor(private route: ActivatedRoute, private articleService: ArticleService) { }

  ngOnInit() {

    this.getArticle();
  }

  getArticle(): void{
    const id = +this.route.snapshot.paramMap.get('id');
    this.articleService.getArticle(id).subscribe(article => this.article = article)
  }

  getArticleImage(): string{
    return this.article.image.imageSrc;
  }

}
