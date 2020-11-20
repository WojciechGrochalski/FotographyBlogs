import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import {NavComponent} from '../nav/nav.component';
import {AuthService} from '../app/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [ NgbCarouselConfig ]
})
export class HomeComponent  {

  constructor(config: NgbCarouselConfig) {
    // customize default values of carousels used by this component tree
    config.interval = 2000;
    config.wrap = true;
    config.keyboard = false;
    config.pauseOnHover = false;

  }

  imgSrc = 'assets/Foto/kradzone.jpg';
  logoSrc = 'assets/Foto/logo.png';
  xd = 'src/assets/Foto/aleja-kaszt.jpg';


ngOnInit(): void {


  }


}
