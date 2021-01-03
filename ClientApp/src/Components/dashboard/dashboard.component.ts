import { Component, OnInit } from '@angular/core';
import {User} from '../../models/User';
import {AuthorizationsService} from '../../Services/Authorizations.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  mainPage = true;
  user: User;
  constructor(
    private authenticationService: AuthorizationsService,
    private router: Router  ) { }

  async ngOnInit() {
    this.user= await JSON.parse(sessionStorage.getItem('user')) ;

  }
  logout(){
    this.authenticationService.logout();
    this.router.navigate(['/']);
  }


}
