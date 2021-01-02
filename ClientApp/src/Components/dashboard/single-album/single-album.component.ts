import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms'
import { ActivatedRoute } from '@angular/router'
import { Album } from 'src/app/models/Album';
import { ImageSnippet } from 'src/app/models/Image';
import { UserService } from '../../../services/user.service'
import { FlashMessagesService } from 'angular2-flash-messages'

@Component({
  selector: 'app-single-album',
  templateUrl: './single-album.component.html',
  styleUrls: ['./single-album.component.css']
})
export class SingleAlbumComponent implements OnInit {

  pictures: ImageSnippet[];
  album: Album;
  imageForm: FormGroup;
  imageAlt: string;
  newPicture: ImageSnippet;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private flashMessagesService: FlashMessagesService,
  ) { }

  ngOnInit() {
    let albumId = +this.route.snapshot.paramMap.get('album_id')
    this.userService.getAlbum(albumId).subscribe(album => this.album = album)
    this.pictures = this.album.images

    this.imageForm = new FormGroup({
      image: new FormControl('', Validators.required)
    })
  }

  get f() { return this.imageForm.controls;}


  onFileChange(event) {
    const file: File = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => { 
        this.imageAlt = file.name
        this.newPicture = {imageSrc: reader.result as string, file}
        this.imageForm.patchValue({
          image: {
            imageSrc: reader.result as string,
            file
          }
        })
      }   
      this.imageSubmit()
    }
  }

  imageSubmit() {
    if (this.imageForm.invalid) {
      return;
    }
    console.log('Wartość image w submicie: ', this.f.image)
    this.userService.addPicture(this.f.image.value, this.album.id).subscribe(pictures => {
      if (pictures) {
        console.log(pictures)
        this.flashMessagesService.show('Dodano zdjęcie!', {cssClass: 'alert-success', timeout: 3000})
      }else {
        this.flashMessagesService.show('Ups! Coś poszło nie tak.', {cssClass: 'alert-danger'})
      }
    })
  }

}
