
export class ImgPath{
  Id: number;
  Path: string;
  AlbumID: number;

  constructor( images:string, albumid: number ) {
    this.Path=images;
    this.AlbumID=albumid;
  }
}
