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
