import {Component, OnInit, ViewEncapsulation} from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { ForumService } from 'src/app/forum.service';
import {Route} from '@angular/router';
import {ArticleService} from '../app/article.service';
import {Observable} from 'rxjs';


export class Article {
  ID: number;
  Tittle: string;
  Content: string;
  Date: string;
  img: string[];
  constructor( id: number, tittle: string, content: string, date: string, img: string[]) {
    this.ID = id;
    this.Tittle = tittle;
    this.Content = content;
    this.Date = date;
    this.img = img;
  }
}

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class ForumComponent implements Article, OnInit {
  lorem: string[] = [];
  img: string[] = [];
  public Listartice: Article[] = [];
  public article = {} as Article;
  readyArticle: string[];
  text: string;
  tittle: string;
  date: string;
  contents: string;
  id: number;

  constructor(private http: HttpClient, private forumservice: ForumService,  private  articleService: ArticleService) {}

  ID: number;
  Tittle: string;
  Content: string;
  Date: string;




  ngOnInit(): void {
    this.lorem.push('.xczxc Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.');
    this.lorem.push('It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using \'Content here, content here\', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for \'lorem ipsum\' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).');
    this.lorem.push('Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.');

    let article = new Article(1, 'Article 1', this.lorem[0], '29.10.2020', this.img );
    this.Listartice.push(article);
    article = new Article(2, 'Article 2', this.lorem[1], '30.10.2020', this.img );

    this.Listartice.push(article);
    article = new Article(3, 'Article 3', this.lorem[2], '31.10.2020', this.img );

    this.Listartice.push(article);
    this.forumservice.SendListOfArticle(this.Listartice).subscribe();



  }


  RouteToArticle( article: string): void {
    this.articleService.RouteTOArticle(article);
  }

  RouteToArticleOB( article: Article) {
     this.articleService.RouteTOArticleOB(article);
  }


}
