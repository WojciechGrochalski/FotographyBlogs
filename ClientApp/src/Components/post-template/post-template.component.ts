import {Component, DoCheck, OnDestroy, OnInit} from '@angular/core';
import {Post} from '../../models/Post';
import {Comment} from '../../models/Comment';
import {PostService} from '../../Services/post.service';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-post-template',
  templateUrl: './post-template.component.html',
  styleUrls: ['./post-template.component.css']
})
export class PostTemplateComponent implements OnInit, OnDestroy {

  post = {} as Post;
  id: number;
  comments: Comment[] = [];
  user: string;
  defaultValue: string = 'write a comment...';
  startWriting: boolean = false;
  subscriptions: Subscription;


  constructor(private postService: PostService) {
    this.subscriptions=interval(400).subscribe((fun=>{
      this.getCommentInterval();
    }))
  }

  async ngOnInit() {

    await this.SetPost();
    await this.GetComment();
    this.user = sessionStorage.getItem('userName');
  }

  AddComment(content: string, post_id: number) {
    let author = sessionStorage.getItem('userName');
    let date_now = new Date().toLocaleDateString();
    let hour = new Date().toLocaleTimeString();
    let date = date_now + ' ' + hour;
    let comment = new Comment(content, author, date, post_id);
    this.postService.SendCommentToDB(comment);
    this.defaultValue = 'write a comment...';
  }

  SetPost() {
    const postObserve = this.postService.GetPost();
    postObserve.subscribe( res => {
      if (res) {
        this.post = res;
        this.id = res.ID;
        sessionStorage.setItem('post', JSON.stringify(res));
      } else {
        this.post = JSON.parse(sessionStorage.getItem('post'));
        this.id = this.post.ID;
      }
    });
  }
getCommentInterval(){
  this.postService.GetCommentFromDB(this.post.ID).subscribe(res=>{
    if(this.comments.length!=res.length){
      this.comments=res;
    }
  });
}
  async GetComment() {
    try {
      this.comments = await this.postService.GetCommentFromDB(this.post.ID).toPromise();

    } catch (e) {
      console.error(e);
    }
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }


  Clear() {
    if (!this.startWriting) {
      if (this.defaultValue == 'write a comment...') {
        this.defaultValue = '';
      }
    }
  }

  UnClear() {
    if (!this.startWriting) {
      if (this.defaultValue == '') {
        this.defaultValue = 'write a comment...';
      }
    }
  }
  StartWrite()
  {
    this.defaultValue = '';
    this.startWriting = true;

  }

}
