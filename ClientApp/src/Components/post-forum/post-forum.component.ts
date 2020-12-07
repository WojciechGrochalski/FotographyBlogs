import { Component, OnInit } from '@angular/core';

import {Post} from '../../models/Post';
import {ArticleService} from '../../Services/article.service';
import {PostService} from '../../Services/post.service';



@Component({
  selector: 'app-post-forum',
  templateUrl: './post-forum.component.html',
  styleUrls: ['./post-forum.component.css']
})


export class PostForumComponent implements OnInit {
  posts: Post[]=[];

  constructor( private  articleService: ArticleService, private postService: PostService) { }

 async ngOnInit() {
    try {
      this.posts = await this.postService.GetPostsFromDB().toPromise();
      console.log("Get new post ");
    }
    catch (e){
      console.error(e);
    }

  }
  RouteToPost( post: Post) {
    this.postService.RouteToPost(post);
  }
}
