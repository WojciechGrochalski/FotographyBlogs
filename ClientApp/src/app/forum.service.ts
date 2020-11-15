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


  SendListOfArticle(data: Article[]): Observable<any> {
    return this.http.post(this.baseUrl + 'api/File', data);

  }

}
interface Article {
  ID: number;
  Tittle: string;
  Content: string;
  Date: string;
  img: string[];
}
