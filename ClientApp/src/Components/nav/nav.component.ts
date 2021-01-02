import {Component, DoCheck,  OnInit} from '@angular/core';

import {AuthorizationsService} from '../../Services/Authorizations.service';



@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})

export class NavComponent implements OnInit, DoCheck{

  user:string ;
  constructor(
    private authenticationService: AuthorizationsService){

  }

  ngOnInit(): void {
    this.user=sessionStorage.getItem('userName');

    }

    refresh(){
    window.location.reload();
    }
    ngDoCheck() {
    if(this.user!=sessionStorage.getItem('userName') ){
      this.user=sessionStorage.getItem('userName');
    }
    }

  logout(){
    this.authenticationService.logout();
    this.user=null;
  }

}
