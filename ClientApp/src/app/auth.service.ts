import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {User} from './models/user';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User>;
  public userName: Observable<User>;
  public user: Observable<any>;
  baseUrl: string = '';
  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    // this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('userName')));
    // this.userName = this.currentUserSubject.asObservable();
     this.baseUrl = baseUrl;
  }
  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }
  login(username: string, password: string) {
   // return this.http.post<any>(`/users/authenticate`, { username, password })
    return this.http.post<User>(this.baseUrl+ 'api/login/login', { username, password })
      .subscribe(res => {
        // login successful if there's a jwt token in the response
        if (res) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          sessionStorage.setItem('userName', res.username);
        }
        return true;

      });

  }

  logout() {
    // remove user from local storage to log user out
    sessionStorage.removeItem('userName');

  }
}
