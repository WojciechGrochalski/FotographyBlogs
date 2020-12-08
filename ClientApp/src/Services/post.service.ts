import {Inject, Injectable} from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import {Post} from '../models/Post';
import {ActivatedRoute, Router} from '@angular/router';
import {Comment} from '../models/Comment';


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
  SendPostsToDB(post: Post) {
    return this.http.post(this.baseUrl + 'api/File/Post',post);

  }
  SendComentToDB(com: Comment) {
    console.log(com);
    return this.http.post(this.baseUrl + 'api/File/Comment',com).subscribe();

  }
  GetComentFromDB(post_id: Number): Observable<any> {
    return this.http.get<Comment[]>(this.baseUrl + 'api/File/'+post_id+'/Comment');

  }

}

