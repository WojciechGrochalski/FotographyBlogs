import { Component, OnInit } from '@angular/core';
import {UsersService} from '../../../Services/Users.service'
import { Album } from '../../../models/Album'
import {ImgPath} from '../../../models/ImgPath';
import {Article} from '../../../models/Article';
import {AlbumService} from '../../../Services/Album.service';


@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.css']
})
export class AlbumsComponent implements OnInit {

  albums: Album[]=[];
  img : ImgPath[]=[];
  constructor(
    private userService: UsersService,
    private albumService: AlbumService ) { }

  async ngOnInit() {


  this.albums=await this.userService.getAlbums(sessionStorage.getItem('userID')).toPromise();
  console.log(this.albums[0].ImgPaths[0].Path)

  }
  RouteToAlbum( album: Album) {
    this.albumService.RouteToAlbum(album,'dashboard/albums/album_id');
  }


}
