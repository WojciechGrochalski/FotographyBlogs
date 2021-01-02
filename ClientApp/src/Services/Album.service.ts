import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient} from '@angular/common/http'
import { catchError } from 'rxjs/operators';
import {Router} from '@angular/router';
import {Album} from '../models/Album';
@Injectable({
  providedIn: 'root'
})
export class GalleryService {

  private unsplashUrl: string = 'https://picsum.photos/v2/list?limit=100';
  albumToSend: Album;
  constructor(
    private http: HttpClient,
    private router: Router   ) { }

  getPictures(): Observable<[]>{
    return this.http.get<[]>(this.unsplashUrl).pipe(catchError(this.handleError<[]>('getPictures', [])))
  }

  handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
  RouteToAlbum(album: Album, path: string) {
    this.router.navigate([path]);
    this.albumToSend = album;
  }
  GetAlbum(): any {
    const albumObserve = new Observable(observe => {
      setTimeout(() => {
        observe.next(this.albumToSend);
      }, 200);
    });
    return albumObserve;
  }
}
