import { Component, OnInit } from '@angular/core';

import {Post} from '../../models/Post';
import {ArticleService} from '../../Services/article.service';
import {ForumService} from '../../Services/forum.service';



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
  //   this.forumService.GetPost().subscribe(res =>{
  //     this.posts=res;
  //   });
  }
  RouteToPost( post: Post) {
    this.articleService.RouteToPost(post);
  }
}
