export class Article {
  ID: number;
  Title: string;
  Content: string;
  Author:string;
  Date: string;
  ImgUrl: string;
  constructor( id: number, tittle: string,author:string, content: string, date: string, img: string) {
    this.ID = id;
    this.Title = tittle;
    this.Author=author;
    this.Content = content;
    this.Date = date;
    this.ImgUrl = img;
  }
}
