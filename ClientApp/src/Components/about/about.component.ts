import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  profile:boolean;
  constructor() { }

  ngOnInit(): void {
     this.profile=true;
  }

  Change(){
    this.profile= !this.profile;
  }

}
