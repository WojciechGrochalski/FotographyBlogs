import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {User} from './models/user';

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
}
