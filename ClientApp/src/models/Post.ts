export class Post {
  ID: number;
  Title: string;
  Content: string;
  Date: string;
  Author: string;
  AuthorID: number;
  constructor( title: string, content: string, date: string, author: string,  authorID: number) {

    this.Title = title;
    this.Content = content;
    this.Date = date;
    this.Author=author;
    this.AuthorID=authorID;
  }
}
