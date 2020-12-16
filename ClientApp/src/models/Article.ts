export class Article {
  ID: number;
  Title: string;
  Content: string;
  Author:string;
  Date: string;
  constructor( tittle: string,author:string, content: string, date: string) {
    this.Title = tittle;
    this.Author=author;
    this.Content = content;
    this.Date = date;
  }
}
