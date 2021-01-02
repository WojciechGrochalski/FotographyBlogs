import {ImgPath} from './ImgPath';


export class Album{
    Id: number;
    Title: string;
    ImgPaths : ImgPath[]=[];
    Description: string;
    UserModelID: number;
  constructor( tittle: string, description: string, userId: number ) {
    this.Title = tittle;
    this.Description = description;
    this.UserModelID=userId;

  }
}
