import { Component, OnInit } from '@angular/core';

import {ArticleService} from '../article.service';
import {Post} from '../../post-forum/post-forum.component';



@Component({
  selector: 'app-post-template',
  templateUrl: './post-template.component.html',
  styleUrls: ['./post-template.component.css']
})
export class PostTemplateComponent implements OnInit {
  post={} as Post;
  constructor( private articleService: ArticleService) { }

  ngOnInit() {

    const postObserve = this.articleService.GetPost();

    postObserve.subscribe((res: Post) => {
      if(res) {
        this.post = res;
        sessionStorage.setItem('post',JSON.stringify(res) );
      }
      else{
        this.post= JSON.parse(sessionStorage.getItem('post')) ;
      }
    });
  }

}
