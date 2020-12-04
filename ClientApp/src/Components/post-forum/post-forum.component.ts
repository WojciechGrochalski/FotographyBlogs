import { Component, OnInit } from '@angular/core';
import {Article} from '../forum/forum.component';
import {HttpClient} from '@angular/common/http';
import {ForumService} from '../app/forum.service';
import {ArticleService} from '../app/article.service';
export class Post {
  ID: number;
  Tittle: string;
  Content: string;
  Date: string;
  author: string;
  constructor( id: number, tittle: string, content: string, date: string, author: string) {
    this.ID = id;
    this.Tittle = tittle;
    this.Content = content;
    this.Date = date;
    this.author=author;

  }
}

@Component({
  selector: 'app-post-forum',
  templateUrl: './post-forum.component.html',
  styleUrls: ['./post-forum.component.css']
})


export class PostForumComponent implements OnInit {

  constructor( private  articleService: ArticleService, private forumService: ForumService) { }
  posts: Post[]=[];
  ngOnInit() {
  let post = new Post(1,'test','It is a long established fact that a reader will be distracted by the readable content of a page when','20.01.2020','Tomek');
  this.posts.push(post);
    this.posts.push(post);
    this.posts.push(post);
    // this.forumService.GetPost().subscribe(res =>{
    //   this.post=res;
    // });
  }
  RouteToPost( post: Post) {
    this.articleService.RouteToPost(post);
  }
}
