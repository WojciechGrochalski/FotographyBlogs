import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { Router, ActivatedRoute } from '@angular/router'
import {UserService} from '../../../services/user.service'

import { FlashMessagesService } from 'angular2-flash-messages'
import { ImageSnippet } from '../../../models/Image'

@Component({
  selector: 'app-new-album',
  templateUrl: './new-album.component.html',
  styleUrls: ['./new-album.component.css']
})
export class NewAlbumComponent implements OnInit {

  albumForm: FormGroup;
  submitted = false;
  selectedImage: ImageSnippet;
  imageSrc: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private flashMessagesService: FlashMessagesService,
    private userService: UserService
  ) {} 

  ngOnInit() {
    this.albumForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      image: ['', Validators.required]
    })
  }

  get f() { return this.albumForm.controls;}
  
  onFileChange(event) {
    const reader = new FileReader();
    const file:File = event.target.files[0];
    if (file) {
      reader.readAsDataURL(file);
      reader.onload = () => { 
        this.imageSrc = reader.result as string
        this.selectedImage = { imageSrc: this.imageSrc, file }; 
        this.albumForm.patchValue({
          image: {
            imageSrc: reader.result as string,
            file
          }
        })
      }          
    }
  }

  albumSubmit() {
    this.submitted = true;
    if (this.albumForm.invalid) {
      return this.flashMessagesService.show('Wszystkie pola są wymagane!', {cssClass: 'alert-danger'})
    }

    let newAlbum: Object = {
      name: this.f.name.value,
      description: this.f.description.value,
      image: this.f.image.value
    }
    // Dodać w serwisie URL do API na backendzie
    this.userService.addAlbum(newAlbum)
      .subscribe(album => {
        if (album) {
          this.router.navigate(['/dashboard/albums'])
          this.flashMessagesService.show('Ablum utworzony!', {cssClass: 'alert-success', timeout: 3000})
        } else {
          this.flashMessagesService.show('Ups! Coś poszło nie tak.', {cssClass: 'alert-danger'})
        }
    })
  }

}
