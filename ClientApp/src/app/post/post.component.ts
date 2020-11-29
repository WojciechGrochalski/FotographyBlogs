import {Component, Input, OnInit} from '@angular/core';
import {Post} from '../../post-forum/post-forum.component';
import {ArticleService} from '../article.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  @Input() post: Post

  constructor(private route: ActivatedRoute, private articleService: ArticleService) { }
  RouteToPost( post: Post) {
    this.articleService.RouteToPost(post);
  }
  ngOnInit() {


  }

}
