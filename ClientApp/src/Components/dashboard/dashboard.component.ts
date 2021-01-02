import { Component, OnInit } from '@angular/core';
import {User} from '../../models/User';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  mainPage = true;
  user: User;
  constructor() {}

  async ngOnInit() {
    this.user= await JSON.parse(sessionStorage.getItem('user')) ;

  }

}
