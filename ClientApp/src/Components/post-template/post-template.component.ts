import { Component, OnInit } from '@angular/core';
import {Post} from '../../models/Post';
import {ArticleService} from '../../Services/article.service';





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
