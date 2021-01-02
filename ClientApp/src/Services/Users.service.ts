import { Inject, Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from '../models/User';
import {Observable, of} from 'rxjs';
import {FileToUpload} from '../models/File';



@Injectable({ providedIn: 'root' })
export class UserService {
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

     return this.http.get(this.baseUrl+'api/User/album'+currUser);
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
    return this.http.post(this.baseUrl+'api/File/photo/', file,{responseType: 'text'});
  }

  addAlbum(album: any): Observable<any> {

    console.log('New album added: ', album)
     return this.http.post(this.baseUrl+'api/UserAlbum', album);
  }

  // getPictures(albumId: number): Observable<ImageSnippet[]>{
  //   let currAlbum = USERS.find(user => user.username === 'sholaris92').albums.find(album => album.id === albumId)
  //   return of(currAlbum.images)
  // }
}

