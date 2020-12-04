import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {User} from '../models/user';
import {AuthService} from '../Services/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'foto';
  currentUser: User;

  constructor(
    private router: Router,
    private authenticationService: AuthService
  ) {

  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
}

