import {Component, DoCheck, OnDestroy, OnInit} from '@angular/core';
import {Post} from '../../models/Post';
import {Comment} from '../../models/Comment';
import {PostService} from '../../Services/post.service';
import {delay} from 'rxjs/operators';
import { interval, Subscription } from 'rxjs';
const source = interval(1000);
const text = 'Your Text Here';
@Component({
  selector: 'app-post-template',
  templateUrl: './post-template.component.html',
  styleUrls: ['./post-template.component.css']
})
export class PostTemplateComponent implements OnInit, OnDestroy {

  post = {} as Post;
  id: number;
  comments: Comment[] = [];
  defaultValue: string = 'write a comment...';
  subscriptions: Subscription;


  constructor(private postService: PostService) {
    this.subscriptions=interval(400).subscribe((fun=>{
      this.getCommentInterval();
    }))
  }

  async ngOnInit() {

    await this.SetPost();
    await this.GetComment();
  }

  AddComment(content: string, post_id: number) {
    let author = sessionStorage.getItem('userName');
    let date_now = new Date().toLocaleDateString();
    let hour = new Date().toLocaleTimeString();
    let date = date_now + ' ' + hour;
    let comment = new Comment(content, author, date, post_id);
    this.postService.SendCommentToDB(comment);
    //this.comments.push(comment);
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
    if (this.defaultValue == 'write a comment...') {
      this.defaultValue = '';
    }
  }

  UnClear() {
    if (this.defaultValue == '') {
      this.defaultValue = 'write a comment...';
    }
  }
  StartWrite()
  {
    this.defaultValue = ' ';

  }





}
