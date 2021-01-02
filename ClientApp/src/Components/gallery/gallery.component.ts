import { Component, OnInit } from '@angular/core';
import { GalleryService} from '../../services/gallery.service'

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {

  pictures: [];

  constructor(private galleryService: GalleryService) { }

  ngOnInit() {
    this.getPictures()
  }
  
  getPictures(): void{
    this.galleryService.getPictures().subscribe(pictures => this.pictures = pictures)
  }

}
