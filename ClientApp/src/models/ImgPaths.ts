
export class ImgPaths{
  ID: number;
  Path: string;
  AlbumID: number;

  constructor( images:string, albumid: number ) {
    this.Path=images;
    this.AlbumID=albumid;
  }
}
