import { Component, OnInit } from '@angular/core';
import { Article } from '../../../models/Article'
import {ArticlesService} from '../../../Services/Articles.service';

@Component({
  selector: 'app-articles-featured',
  templateUrl: './articles-featured.component.html',
  styleUrls: ['./articles-featured.component.css']
})
export class ArticlesFeaturedComponent implements OnInit {

 public mostViewArticles: Article[];
  public articlefromSearch: Article[];

  constructor(
    private articleService: ArticlesService) { }

  async ngOnInit() {
    this.mostViewArticles = await this.articleService.GetFeaturedArticles().toPromise();

  }
  RouteToArticleOB( article: Article) {
    this.articleService.RouteTOArticleOB(article,'detail');
  }
  Search(keyword: string,search){
    this.articleService.SearchForArticle(keyword).subscribe(res =>{
      this.articlefromSearch=res;
      search.value="";
    });
  }
}
