export class Comment{
  id: number;
  content: string;
  author: string;
  date: string;
  post_id: number;
  constructor(Content:string,Author: string, Date: string, Post_id:number) {

    this.content=Content;
    this.author=Author;
    this.date=Date;
    this.post_id=Post_id;
  }
}
