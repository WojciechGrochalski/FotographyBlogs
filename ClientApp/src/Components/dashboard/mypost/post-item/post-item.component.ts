import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Post} from '../../../../models/Post';
import {PostService} from '../../../../Services/post.service';

@Component({
  selector: 'app-post-item',
  templateUrl: './post-item.component.html',
  styleUrls: ['./post-item.component.css']
})
export class PostItemComponent implements OnInit {

  @Input() post: Post;


  constructor(
    private postService: PostService ) { }

  ngOnInit() {
  }

  deletePost(post: Post) {
    this.postService.DeletePost(post.ID);
    window.location.reload();
  }

  RouteToEdit( post: Post) {
    this.postService.RouteToPost(post,'dashboard/edit-post');
  }
  RouteToPost( post: Post) {
    this.postService.RouteToPost(post,'post-template');
  }

}
