import {Inject, Injectable} from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import {catchError} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ForumService {

  baseUrl: string = '';

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.baseUrl = baseUrl;

  }


  GetArticle(): Observable<any> {
    return this.http.get(this.baseUrl + 'api/File/Article');

  }

  GetPost(): Observable<any> {
    return this.http.get(this.baseUrl + 'api/File/Post');

  }

}
interface Article {
  ID: number;
  Tittle: string;
  Content: string;
  Date: string;
  img: string[];
}
