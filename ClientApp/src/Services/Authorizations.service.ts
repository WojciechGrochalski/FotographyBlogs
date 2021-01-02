import { Inject, Injectable } from '@angular/core';
import {HttpClient, HttpEvent, HttpRequest} from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import {User} from '../models/User';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User>;
  public userName: Observable<User>;
  public user: Observable<any>;
  baseUrl: string = '';
  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {

     this.baseUrl = baseUrl;
  }

  login(username: string, password: string) {
   // return this.http.post<any>(`/users/authenticate`, { username, password })
    return this.http.post<User>(this.baseUrl+ 'api/login/login', { username, password });


  }

  logout() {
    // remove user from local storage to log user out
    sessionStorage.removeItem('userName');
    sessionStorage.removeItem('user');

  }

  isLoggedIn() {
    return sessionStorage.getItem('userName');
  }


}
