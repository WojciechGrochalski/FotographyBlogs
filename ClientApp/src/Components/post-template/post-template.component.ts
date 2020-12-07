import {AfterContentInit, AfterViewInit, Component, DoCheck, OnInit} from '@angular/core';
import {Post} from '../../models/Post';
import {Comment} from '../../models/Comment';
import {PostService} from '../../Services/post.service';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-post-template',
  templateUrl: './post-template.component.html',
  styleUrls: ['./post-template.component.css']
})
export class PostTemplateComponent implements OnInit, DoCheck {
  post={} as Post;
  id: number;
 comments: Comment[]=[];
  defaultValue: string="write a comment..."

  constructor( private postService: PostService) { }

  async ngOnInit() {

    await this.SetPost();
    await new Promise(resolve => setTimeout(resolve,1000));
    try {
      let ID = JSON.parse(sessionStorage.getItem('post')).ID;
      console.log('ID from session storage = '+ID);
      this.comments = await this.postService.GetComentFromDB(this.id).toPromise();

    } catch (e) {
      console.error(e);
    }

  }

  AddComment(content: string,post_id: number ) {
    let author=sessionStorage.getItem('userName');
    let date_now = new Date().toLocaleDateString();
    let hour = new Date().toLocaleTimeString();
    let date = date_now+' '+ hour;
    let comment=new Comment(content,author,date,post_id);
    this.postService.SendComentToDB(comment);
    this.comments.push(comment);
    this.defaultValue="write a comment..."
  }
      SetPost() {
     const postObserve = this.postService.GetPost();
     postObserve.subscribe((res: Post) => {
         if(res) {
           this.post = res;
           this.id=res.ID;
           console.log(this.post.ID +" from subscribe");
           sessionStorage.setItem('post',JSON.stringify(res));
         }
         else{
           this.post= JSON.parse(sessionStorage.getItem('post'));
           this.id=this.post.ID;
         }
       });
  }

  async ngDoCheck(): Promise<void> {

    try {
      let ID = JSON.parse(sessionStorage.getItem('post')).ID;
  //    console.log('ID from session storage = '+ID);
      this.comments = await this.postService.GetComentFromDB(this.id).toPromise();

    } catch (e) {
      console.error(e);
    }
  }
  Clear(){
    if(this.defaultValue=="write a comment...") {
      this.defaultValue = "";
    }
  }
UnClear(){
    if(this.defaultValue==""){
      this.defaultValue="write a comment..."
    }
}

}
