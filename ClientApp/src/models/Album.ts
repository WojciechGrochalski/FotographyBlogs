import {ImgPaths} from './ImgPaths';


export class Album{
    ID: number;
    Title: string;
    ImgPaths : ImgPaths[]=[];
    Description: string;
    UserModelID: number;
  constructor( tittle: string, description: string, userId: number ) {
    this.Title = tittle;
    this.Description = description;
    this.UserModelID=userId;

  }
}
