export class Article {
  ID: number;
  Title: string;
  Content: string;
  Author:string;
  Date: string;
  Img: string;
  view?: number;
  constructor( tittle: string,author:string, content: string, date: string, img:string) {
    this.Title = tittle;
    this.Author=author;
    this.Content = content;
    this.Date = date;
    this.Img=img;
  }
}
