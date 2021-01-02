import { Inject, Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from '../models/User';
import {Observable} from 'rxjs';
import {FileToUpload} from '../models/File';
import {ImgPath} from '../models/ImgPath';
import {Album} from '../models/Album';
import {map} from 'rxjs/operators';



@Injectable({ providedIn: 'root' })
export class UsersService {
  baseUrl: string = '';

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.baseUrl = baseUrl;

  }

  getAll() {
    return this.http.get<User[]>(`/users`);
  }

  register(user: User) {
    return this.http.post(this.baseUrl + 'api/login/register', user);
  }

  delete(id: number) {
    return this.http.delete(`/users/${id}`);
  }


  updateUser(user: any, id: number): Observable<any>{

     return this.http.post(this.baseUrl+'api/User/update/'+id, user)
  }

  getAlbums(currUser: string): Observable<any>{
    return this.http.get(this.baseUrl + 'api/User/album/' + currUser);

  }
  getAlbumsImg(currUser: number): Observable<any>{
    return this.http.get(this.baseUrl + 'api/User/album/img' + currUser);

  }

  getAlbum(albumId: number): Observable<any>{
    return this.http.get(this.baseUrl+'api/UserAlbum/'+ albumId);

  }

  public  addPicture(file: FileToUpload, id: number) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post(this.baseUrl+'api/User/photo/'+ id, file,{responseType: 'text'});
  }
  public uploadFile(file: FileToUpload) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post(this.baseUrl+'api/File/photo', file,{responseType: 'text'});
  }

  addAlbum(album: any): Observable<any> {

     return this.http.post(this.baseUrl+'api/UserAlbum', album,{responseType: 'text'});
  }
  addImgToAlbum(imgPath: ImgPath): Observable<any> {

    return this.http.post(this.baseUrl+'api/UserAlbum/addimg', imgPath );
  }
  GetImgFromAlbum(id: number): Observable<any>{
    return this.http.get(this.baseUrl+'api/UserAlbum/'+ id);
  }

}

