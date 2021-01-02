import {Component, DoCheck, OnInit} from '@angular/core';
import {Post} from '../../models/Post';
import {Comment} from '../../models/Comment';
import {PostService} from '../../Services/post.service';


@Component({
  selector: 'app-post-template',
  templateUrl: './post-template.component.html',
  styleUrls: ['./post-template.component.css']
})
export class PostTemplateComponent implements OnInit, DoCheck {
  post = {} as Post;
  id: number;
  comments: Comment[] = [];
  defaultValue: string = 'write a comment...';

  constructor(private postService: PostService) {
  }

  async ngOnInit() {
    const postObserve = this.postService.GetPost();
    postObserve.subscribe( res => {
      if (res) {
        this.post = res;
        console.log(this.post.ID + ' from subscribe');
        console.log(this.post, '1');
        sessionStorage.setItem('post', JSON.stringify(res));
      } else {
        //this.post = JSON.parse(sessionStorage.getItem('post'));
       // this.id = this.post.ID;
      }
    });
    await this.GetComment();
  }

  AddComment(content: string, post_id: number) {
    let author = sessionStorage.getItem('userName');
    let date_now = new Date().toLocaleDateString();
    let hour = new Date().toLocaleTimeString();
    let date = date_now + ' ' + hour;
    let comment = new Comment(content, author, date, post_id);
    this.postService.SendCommentToDB(comment);
    this.comments.push(comment);
    this.defaultValue = 'write a comment...';
  }

  SetPost() {
    const postObserve = this.postService.GetPost();
    postObserve.subscribe( res => {
      if (res) {
        this.post = res;
        this.id = res.ID;
        console.log(this.post.ID + ' from subscribe');
        console.log(this.post, '1');
        sessionStorage.setItem('post', JSON.stringify(res));
      } else {
        this.post = JSON.parse(sessionStorage.getItem('post'));
        this.id = this.post.ID;
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
   delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

  async ngDoCheck(): Promise<void> {
    if(this.comments.length>1) {
      await this.delay(1200);
      try {
        this.comments = await this.postService.GetCommentFromDB(this.post.ID).toPromise();

      } catch (e) {
        console.error(e);
      }

    }
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

}
