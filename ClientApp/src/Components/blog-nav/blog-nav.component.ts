import { Component, OnInit } from '@angular/core';
import {AuthorizationsService} from '../../Services/Authorizations.service';

@Component({
  selector: 'app-blog-nav',
  templateUrl: './blog-nav.component.html',
  styleUrls: ['./blog-nav.component.css']
})
export class BlogNavComponent implements OnInit {

  constructor(private authenticationService: AuthorizationsService) { }

  ngOnInit() {
  }
  logout(){
    this.authenticationService.logout();

  }

}
