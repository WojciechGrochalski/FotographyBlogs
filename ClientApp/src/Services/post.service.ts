import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import {Post} from '../models/Post';
import {ActivatedRoute, Router} from '@angular/router';
import {Comment} from '../models/Comment';
import {FileToUpload} from '../models/File';
import {delay} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class PostService {

  baseUrl: string = '';
  post: Post;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient,
    @Inject('BASE_URL') baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  RouteToPost(post: Post, path: string) {
    this.post = post;
    this.router.navigate([path]);

  }
  GetPost(): any {
    const postObserve = new Observable(observe => {
        observe.next(this.post);
    });
    return postObserve;
  }

  GetPostsFromDB(): Observable<any> {
    return this.http.get(this.baseUrl + 'api/Posts/Post');

  }
  AddPost(post: Post) {
    return this.http.post(this.baseUrl + 'api/Posts/Post',post);

  }

  SendCommentToDB(com: Comment) {
    console.log(com);
    return this.http.post(this.baseUrl + 'api/Posts/Comment',com).subscribe();

  }
  GetCommentFromDB(post_id: Number): Observable<any> {
    return this.http.get<Comment[]>(this.baseUrl + 'api/Posts/'+post_id+'/Comment').pipe(delay(500));

  }

  public uploadFile(file: FileToUpload) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post(this.baseUrl+'api/File/photo/', file,{responseType: 'text'});
  }

  getUserPosts(user: Number): Observable<any>{
    return this.http.get(this.baseUrl + 'api/Posts/user/'+user);
  }
  DeletePost(id: number){
    return this.http.delete(this.baseUrl + 'api/Posts/delete/'+id).subscribe();
  }

  EditPost(post: Post) : Observable<any>{
    return this.http.post(this.baseUrl + 'api/Posts/edit', post);
  }
}

