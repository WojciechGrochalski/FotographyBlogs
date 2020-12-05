import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {Comment} from '../models/Comment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private subject = new Subject<any>();
  commentToSend: Observable<Comment>= new Observable<Comment>();
  comment: Comment;
  constructor() { }

  AddComment():any {
   return  this.commentToSend = new Observable<Comment>((observer) => {
      observer.next(this.comment);
      observer.complete();

    })
  }

  GetComment(comment: Comment){
    this.comment=comment;
  }
}
