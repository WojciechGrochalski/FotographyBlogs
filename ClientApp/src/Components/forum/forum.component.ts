import {Component, DoCheck, OnInit, ViewEncapsulation} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Article} from '../../models/Article';
import {ArticlesService} from '../../Services/Articles.service';




@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class ForumComponent implements  OnInit, DoCheck {
  public articles: Article[] = [];
  public article = {} as Article;
  IsUser: string;
  switch: boolean=false;

  constructor(
    private http: HttpClient,
    private articleService: ArticlesService ) {}

  ngOnInit(): void {
    this.IsUser=sessionStorage.getItem('userName');
    this.articleService.GetArticles().subscribe(res =>{
      this.articles=res;
    });
  }
  ngDoCheck() {
    if(this.IsUser!=sessionStorage.getItem('userName') ){
      this.IsUser=sessionStorage.getItem('userName');
    }
  }

  async AddArticle(title: string, content: string) {
    let date_now = new Date().toLocaleDateString();
    console.log('Data time now', date_now)
    let article = await new Article(title, content, date_now, sessionStorage.getItem('userName'),"");
    await this.articleService.AddArticle(article).subscribe(res => {
      if (res) {
        window.location.reload();
      }
    });

  }
  Search(keyword: string){
    this.articleService.SearchForArticle(keyword).subscribe(res =>{
      this.articles=res;
    });
  }
  RouteToArticleOB( article: Article) {
     this.articleService.RouteTOArticleOB(article,'article-template');
  }
  Switch(){
    this.switch=true;
  }
  ExitTemplate(){
    this.switch=false;
  }
}
