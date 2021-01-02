import {Album} from './Album';
import {Post} from './Post';

export class User {
  id: number;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  album?: Album[];
  posts?: Post[];
  profileImg: string;

  constructor(usr: string, firstname: string, lastname:string) {
    this.username=usr;
    this.firstName=firstname;
    this.lastName=lastname;
  }

}
