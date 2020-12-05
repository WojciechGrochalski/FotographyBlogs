import {Component, DoCheck, Input, OnInit} from '@angular/core';
import {Post} from '../../models/Post';
import {Comment} from '../../models/Comment';
import {ArticleService} from '../../Services/article.service';
import {Observable, Subscription} from 'rxjs';
import {CommentService} from '../../Services/comment.service';

@Component({
  selector: 'app-post-template',
  templateUrl: './post-template.component.html',
  styleUrls: ['./post-template.component.css']
})
export class PostTemplateComponent implements OnInit {
  post={} as Post;
  comments: Comment[]=[];

  constructor( private articleService: ArticleService, private commentService: CommentService) { }

  ngOnInit() {

    let comment = new Comment('asd','ads','ads',1);
    this.comments.push(comment);
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

  AddComment(content: string) {
    let comment=new Comment(content,'a','a',1);
    this.comments.push(comment);
  }
}
