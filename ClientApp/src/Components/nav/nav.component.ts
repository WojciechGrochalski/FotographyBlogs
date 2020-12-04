import {Component, DoCheck, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {User} from '../app/models/user';
import {FormBuilder} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../app/auth.service';
import {AlertService} from '../app/alert.service';
import {Article} from '../forum/forum.component';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})



export class NavComponent implements OnInit, DoCheck{
  logoSrc = 'assets/Foto/logo.png';
  user:string ;
  constructor(
    private authenticationService: AuthService){

  }

  ngOnInit(): void {
    this.user=sessionStorage.getItem('userName');

    }
    ngO

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
