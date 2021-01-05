import {Component, OnChanges, OnInit} from '@angular/core';
import {UsersService} from '../../../Services/Users.service'
import { Album } from '../../../models/Album'
import {ImgPaths} from '../../../models/ImgPaths';

import {AlbumService} from '../../../Services/Album.service';


@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.css']
})
export class AlbumsComponent implements OnInit{

  albums: Album[]=[];
  img : ImgPaths[]=[];
  constructor(
    private userService: UsersService,
    private albumService: AlbumService ) { }

  async ngOnInit() {

  this.albums=await this.userService.getAlbums(sessionStorage.getItem('userID')).toPromise();


  }
  RouteToAlbum( album: Album) {
    this.albumService.RouteToAlbum(album,'dashboard/albums/album_id');
  }

  async RemoveAlbum(album: Album) {

    let index=this.albums.findIndex(d=>d.ID===album.ID);
    this.albums.splice(index,1);
    await this.albumService.RemoveAlbum(album.ID);

  }


}
