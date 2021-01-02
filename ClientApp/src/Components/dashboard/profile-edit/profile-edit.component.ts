import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../../services/user.service'
import { FlashMessagesService } from 'angular2-flash-messages'
import { Router, ActivatedRoute } from '@angular/router'

class ImageModel {
  constructor(
    public imageSrc: string,
    public file: File
  ){}
}

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css']
})
export class ProfileEditComponent implements OnInit {

  profileForm: FormGroup;
  submitted = false;
  selectedImage: ImageModel;
  imageSrc: string;

  constructor(
    private formBuilder: FormBuilder,
    private flashMessagesService: FlashMessagesService,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
    this.profileForm = this.formBuilder.group({
      username: ['', [Validators.minLength(4), Validators.required]],
      firstName: ['',[ Validators.minLength(2), Validators.required]],
      lastName: ['', [Validators.minLength(2), Validators.required]],
      profileImage: ['']
    })
  }
  get f() { return this.profileForm.controls;}
  
  onFileChange(event) {
    const reader = new FileReader();
    const file: File = event.target.files[0];

    if (file) {
      reader.readAsDataURL(file);

      reader.onload = () => { 
        this.imageSrc = reader.result as string
        this.selectedImage = new ImageModel(reader.result as string, file); 
        this.profileForm.patchValue({
        profileImage: this.selectedImage.imageSrc
        })
      }      
    }
  }

  // Dodać w serwisie URL do API na backendzie
  userSubmit() {
    this.submitted = true;

    if (this.profileForm.invalid) {
      return this.flashMessagesService.show('Pola nie mogą pozostać puste!', {cssClass: 'alert-danger'})
    }

    const newUserData = {
      username: this.f['username'].value,
      firstName: this.f['firstName'].value,
      lastName: this.f['lastName'].value,
      profileImage: this.f['profileImage'].value ? this.f['profileImage'].value : ''
    }
    
    this.userService.updateUser(newUserData).subscribe(res => {
      if (res) {
        this.router.navigate(['/dashboard'])
        this.flashMessagesService.show('Profil został zaktualizowany', {cssClass: 'alert-success', timeout: 3000})
      } else {
        this.flashMessagesService.show('Ups! Coś poszło nie tak.', {cssClass: 'alert-danger'})
      }
    })    
  }

}
