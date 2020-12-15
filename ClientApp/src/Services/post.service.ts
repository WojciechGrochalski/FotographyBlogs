import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import {Post} from '../models/Post';
import {ActivatedRoute, Router} from '@angular/router';
import {Comment} from '../models/Comment';
import {FileToUpload} from '../models/File';


@Injectable({
  providedIn: 'root'
})
export class PostService {

  baseUrl: string = '';
  post: Post;

  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient,
              @Inject('BASE_URL') baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  RouteToPost(post: Post) {
    this.router.navigate(['post-template']);
    this.post = post;
  }
  GetPost(): any {
    const postObserve = new Observable(observe => {
      // setTimeout(() => {
        observe.next(this.post);
      // }, 350);
    });
    return postObserve;
  }

  GetPostsFromDB(): Observable<any> {
    return this.http.get(this.baseUrl + 'api/File/Post');

  }
  AddPost(post: Post) {
    return this.http.post(this.baseUrl + 'api/File/Post',post);

  }

  SendComentToDB(com: Comment) {
    console.log(com);
    return this.http.post(this.baseUrl + 'api/File/Comment',com).subscribe();

  }
  GetComentFromDB(post_id: Number): Observable<any> {
    return this.http.get<Comment[]>(this.baseUrl + 'api/File/'+post_id+'/Comment');

  }
  // public uploadFile(post: Post, file: FormData) {
  //   return  this.http.post(this.baseUrl+'api/File/photo', file, {reportProgress: true, observe: 'events'});
  // }

  // public uploadFile( file: FormData) {
  //   return  this.http.post<any>(this.baseUrl+'api/File/photo', file, {reportProgress: true, observe: 'events'});
  // }

  public uploadFile(file: FileToUpload) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post(this.baseUrl+'api/File/photoC/', file,{responseType: 'text'});
  }
  public getUrl( ) {
    return  this.http.get<string>(this.baseUrl+'api/File/photo' );
  }

}

