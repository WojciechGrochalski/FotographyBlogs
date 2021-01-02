import {Component, Input, OnInit} from '@angular/core';

import {ActivatedRoute} from '@angular/router';

import {Post} from '../../models/Post';
import {PostService} from '../../Services/post.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  @Input() post: Post;

  constructor(
    private route: ActivatedRoute,
    private postService: PostService) { }

  RouteToPost( post: Post) {
    this.postService.RouteToPost(post,'post-template');
  }
  ngOnInit() {


  }

}
