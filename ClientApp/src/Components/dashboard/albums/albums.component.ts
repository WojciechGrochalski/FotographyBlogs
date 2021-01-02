import { Component, OnInit } from '@angular/core';
import {UserService} from '../../../services/user.service'
import { Album } from '../../../models/Album'

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.css']
})
export class AlbumsComponent implements OnInit {

  albums: Album[] = [];
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getAlbums('sholaris92').subscribe(albums => this.albums = albums)
  }



}
