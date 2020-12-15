import {Component, DoCheck, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {AuthService} from '../../Services/auth.service';



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
