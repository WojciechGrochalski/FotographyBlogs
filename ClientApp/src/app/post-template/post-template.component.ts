import { Component, OnInit } from '@angular/core';
import {Article} from '../../forum/forum.component';
import {Post} from '../../post-forum/post-forum.component';
import {ActivatedRoute} from '@angular/router';
import {ArticleService} from '../article.service';

@Component({
  selector: 'app-post-template',
  templateUrl: './post-template.component.html',
  styleUrls: ['./post-template.component.css']
})
export class PostTemplateComponent implements OnInit {

  constructor(private route: ActivatedRoute, private articleService: ArticleService) { }
  post: Post;
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
