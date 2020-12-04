export class Article {
  ID: number;
  Tittle: string;
  Content: string;
  Date: string;
  img: string[];
  constructor( id: number, tittle: string, content: string, date: string, img: string[]) {
    this.ID = id;
    this.Tittle = tittle;
    this.Content = content;
    this.Date = date;
    this.img = img;
  }
}
