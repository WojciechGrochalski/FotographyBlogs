import { Component, OnInit } from '@angular/core';
import {Article} from '../../forum/forum.component';

@Component({
  selector: 'app-post-forum',
  templateUrl: './post-forum.component.html',
  styleUrls: ['./post-forum.component.css']
})

export class Post {
  ID: number;
  Tittle: string;
  Content: string;
  Date: string;
  author: string;
  constructor( id: number, tittle: string, content: string, date: string, author: string) {
    this.ID = id;
    this.Tittle = tittle;
    this.Content = content;
    this.Date = date;
    this.author=author;

  }
}
export class PostForumComponent implements OnInit {

  constructor() { }
  listOfPost: Post[]=[];
   post = {} as Post;
  ngOnInit() {
  let post = new Post(1,'test','It is a long established fact that a reader will be distracted by the readable content of a page when','20.01.2020','Tomek');
  this.listOfPost.push(post);
  }

}
