import {Component, Input, OnInit} from '@angular/core';

import {ActivatedRoute} from '@angular/router';
import {ArticleService} from '../../Services/article.service';
import {Post} from '../../models/Post';

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
