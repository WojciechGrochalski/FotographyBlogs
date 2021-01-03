import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsersService } from '../../../Services/Users.service'
import { FlashMessagesService } from 'angular2-flash-messages'
import { Router, ActivatedRoute } from '@angular/router'
import {User} from '../../../models/User';
import {Album} from '../../../models/Album';
import {FileToUpload} from '../../../models/File';
const MAX_SIZE: number = 4194304;

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
  album: Album;
  theFile: any = null;
  messages: string[] = [];
  url:string | ArrayBuffer;
  loading: boolean = false; // Flag variable
  file: File = null; // Variable to store file
  User: User;

  constructor(
    private formBuilder: FormBuilder,
    private flashMessagesService: FlashMessagesService,
    private userService: UsersService,
    private router: Router
  ) { }

  ngOnInit() {
    this.profileForm = this.formBuilder.group({
      username: ['', [Validators.minLength(4), Validators.required]],
      firstName: ['',[ Validators.minLength(2), Validators.required]],
      lastName: ['', [Validators.minLength(2), Validators.required]],
      profileImage: ['']
    })
    this.User = JSON.parse(sessionStorage.getItem('user'));
    console.log(this.User.id)
  }
  get f() { return this.profileForm.controls;}

  onFileChange(event) {
    this.theFile = null;
    if (event.target.files && event.target.files.length > 0) {
      // Don't allow file sizes over 1MB
      if (event.target.files[0].size < MAX_SIZE) {
        // Set theFile property
        console.log(event.target.files[0]);
        this.theFile = event.target.files[0];
        let reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);
        reader.onload=(event=>{
          this.url=reader.result;
        })
      }
      else {
        // Display error message
        this.messages.push("File: " + event.target.files[0].name + " is too large to upload.");
      }
    }
  }

  private  readAndUploadFile(theFile: any ) {

    let file = new FileToUpload();
    // Set File Information
    file.fileName = theFile.name;
    file.fileSize = theFile.size;
    file.fileType = theFile.type;
    file.lastModifiedTime = theFile.lastModified;
    file.lastModifiedDate = theFile.lastModifiedDate;
    let reader = new FileReader();
    // Setup onload event for reader
    reader.onload =  async () => {
      // Store base64 encoded representation of file
      file.fileAsBase64 = reader.result.toString();
      // POST to server
      this.userService.uploadFile(file).subscribe(resp => {
        this.messages.push("Upload complete");
        this.submitted = true;

        let  newUserData =  new User(
          this.User.username,
          this.User.firstName,
          this.User.lastName)
        newUserData.profileImg=resp;

        this.userService.updateUser(newUserData, this.User.id).subscribe(res => {
          if (res) {
            sessionStorage.setItem('user', JSON.stringify(res));
            this.router.navigate(['/dashboard'])
            window.location.reload();
            this.flashMessagesService.show('Profil został zaktualizowany', {cssClass: 'alert-success', timeout: 3000})}
          else {
            this.flashMessagesService.show('Ups! Coś poszło nie tak.', {cssClass: 'alert-danger'})
          }
        });
      });
    }
    // Read the file
    reader.readAsDataURL(theFile);
    console.log("end readAndUploadFile")
  }
  // Dodać w serwisie URL do API na backendzie
  userSubmit() {
    if(this.theFile) {
      this.readAndUploadFile(this.theFile);
    }
    else{
      let  newUserData =  new User(
        this.User.username,
        this.User.firstName,
        this.User.lastName)
      newUserData.profileImg=this.User.profileImg;

      this.userService.updateUser(newUserData, this.User.id).subscribe(res => {
        if (res) {
          sessionStorage.setItem('user', JSON.stringify(res));
          this.router.navigate(['/dashboard'])
          this.flashMessagesService.show('Profil został zaktualizowany', {cssClass: 'alert-success', timeout: 3000})}
        else {
          this.flashMessagesService.show('Ups! Coś poszło nie tak.', {cssClass: 'alert-danger'})
        }
      });
    }
  }

  onKeyName(event) {
    this.User.username= event.target.value;
  }
  onKeyFName(event) {
    this.User.firstName= event.target.value;
  }
  onKeyLName(event) {
    this.User.lastName= event.target.value;
  }

}
