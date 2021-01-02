import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-blog-nav',
  templateUrl: './blog-nav.component.html',
  styleUrls: ['./blog-nav.component.css']
})
export class BlogNavComponent implements OnInit {

  constructor(private authenticationService: AuthService) { }

  ngOnInit() {
  }

}
