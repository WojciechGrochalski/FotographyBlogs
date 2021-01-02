import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  mainPage = true;

  constructor() {}

  ngOnInit() {
    // Tutaj pobrać dane użytkownika z pamięci lokalnek
    localStorage.setItem('username', 'Sam Smith')
  }

}
