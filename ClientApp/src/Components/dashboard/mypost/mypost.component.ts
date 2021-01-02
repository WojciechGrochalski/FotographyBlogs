import { Component, OnInit } from '@angular/core';
import {Post} from '../../../models/Post';
import {PostService} from '../../../Services/post.service';

@Component({
  selector: 'app-mypost',
  templateUrl: './mypost.component.html',
  styleUrls: ['./mypost.component.css']
})
export class MypostComponent implements OnInit {

  posts: Post[];

  constructor(
    private postService: PostService
  ) { }

  async ngOnInit() {

    this.posts= await this.postService.getUserPosts(sessionStorage.getItem('userName')).toPromise();
    localStorage.setItem('posts', JSON.stringify(this.posts))
    this.posts = JSON.parse(localStorage.getItem('posts'))
  }

  deletePost(post: Post) {
    this.postService.DeletePost(post.ID);
  }

}
