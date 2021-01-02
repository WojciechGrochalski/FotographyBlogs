export class Post {
  ID: number;
  Title: string;
  Content: string;
  Date: string;
  Author: string;
  // ImgUrl: string
  constructor( title: string, content: string, date: string, author: string ) {

    this.Title = title;
    this.Content = content;
    this.Date = date;
    this.Author=author;
  }
}
