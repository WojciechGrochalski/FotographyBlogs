import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { Router, ActivatedRoute } from '@angular/router'
import {UsersService} from '../../../Services/Users.service'
import { FlashMessagesService } from 'angular2-flash-messages'
import {Album} from '../../../models/Album';
import {FileToUpload} from '../../../models/File';
import {ImgPaths} from '../../../models/ImgPaths';
import {User} from '../../../models/User';

const MAX_SIZE: number = 4194304;
@Component({
  selector: 'app-new-album',
  templateUrl: './new-album.component.html',
  styleUrls: ['./new-album.component.css']
})
export class NewAlbumComponent implements OnInit {

  imageSrc: string | ArrayBuffer;
  user= {} as User;
  theFile: any = null;
  messages: string[] = [];
  url:string | ArrayBuffer;
  loading: boolean = false; // Flag variable
  file: File = null; // Variable to store file
  img: string[]=[];
  albumForm: FormGroup;
  submitted = false;
  private UrlToPostImg: string;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private flashMessagesService: FlashMessagesService,
    private userService: UsersService
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
          this.imageSrc=reader.result;
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
        this.UrlToPostImg=resp;
        console.log(this.UrlToPostImg, 'from upload');
        this.submitted = true;
        if (this.albumForm.invalid) {
          return this.flashMessagesService.show('Wszystkie pola są wymagane!', {cssClass: 'alert-danger'})
        }
        console.log(this.UrlToPostImg);
        this.user = (JSON.parse( sessionStorage.getItem('user')));
        console.log(this.user,'user id');
        let newAlbum = new Album(this.f.name.value,
          this.f.description.value,this.user.id);
        this.userService.addAlbum(newAlbum)
          .subscribe(album => {
            const id: number = +album;
            let img = new ImgPaths(this.UrlToPostImg, id);
            this.userService.addImgToAlbum(img).subscribe();
            if (album) {
              this.router.navigate(['/dashboard/albums'])
              this.flashMessagesService.show('Ablum utworzony!', {cssClass: 'alert-success', timeout: 3000})
            } else {
              this.flashMessagesService.show('Ups! Coś poszło nie tak.', {cssClass: 'alert-danger'})
            }
          });
      });
    }
    // Read the file
    reader.readAsDataURL(theFile);
    console.log("end readAndUploadFile")
  }
  // createAndSubmit(url: string){
  //   this.submitted = true;
  //   if (this.albumForm.invalid) {
  //     return this.flashMessagesService.show('Wszystkie pola są wymagane!', {cssClass: 'alert-danger'})
  //   }
  //   console.log(this.UrlToPostImg);
  //   this.user = (JSON.parse( sessionStorage.getItem('user')));
  //   console.log(this.user,'user id');
  //   let newAlbum = new Album(this.f.name.value,
  //     this.f.description.value,this.user.id);
  //   this.userService.addAlbum(newAlbum)
  //     .subscribe(album => {
  //       const id: number = +album;
  //       let img = new ImgPaths(this.UrlToPostImg, id);
  //       this.userService.addImgToAlbum(img).subscribe();
  //       if (album) {
  //         this.router.navigate(['/dashboard/albums'])
  //         this.flashMessagesService.show('Ablum utworzony!', {cssClass: 'alert-success', timeout: 3000})
  //       } else {
  //         this.flashMessagesService.show('Ups! Coś poszło nie tak.', {cssClass: 'alert-danger'})
  //       }
  //     });
  // }
  albumSubmit() {
  this.readAndUploadFile(this.theFile);
  }

}
