import { Component, OnInit } from '@angular/core';
import {Post} from '../../../models/Post';
import {PostService} from '../../../Services/post.service';
import {User} from '../../../models/User';

@Component({
  selector: 'app-mypost',
  templateUrl: './mypost.component.html',
  styleUrls: ['./mypost.component.css']
})
export class MypostComponent implements OnInit {

  posts: Post[];
  User: User;

  constructor(
    private postService: PostService ) { }

  async ngOnInit() {

    this.User = JSON.parse(sessionStorage.getItem('user'));
    console.log(this.User);
    console.log(this.User.id);
    this.posts= await this.postService.getUserPosts(this.User.id).toPromise();
    localStorage.setItem('posts', JSON.stringify(this.posts))
    this.posts = JSON.parse(localStorage.getItem('posts'))
  }



}
