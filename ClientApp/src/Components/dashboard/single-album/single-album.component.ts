import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms'
import { ActivatedRoute } from '@angular/router'

import { UsersService } from '../../../Services/Users.service'
import { FlashMessagesService } from 'angular2-flash-messages'

import {Album} from '../../../models/Album';
import {FileToUpload} from '../../../models/File';
import {ImgPath} from '../../../models/ImgPath';
import {AlbumService} from '../../../Services/Album.service';
const MAX_SIZE: number = 4194304;

@Component({
  selector: 'app-single-album',
  templateUrl: './single-album.component.html',
  styleUrls: ['./single-album.component.css']
})

export class SingleAlbumComponent implements OnInit {

  pictures: ImgPath[]=[];
  album: Album;
  imageForm: FormGroup;
  newPicture: string | ArrayBuffer;
  theFile: any = null;
  messages: string[] = [];
  url:string | ArrayBuffer;
  loading: boolean = false; // Flag variable
  file: File = null; // Variable to store file


  constructor(
    private route: ActivatedRoute,
    private userService: UsersService,
    private albumService: AlbumService,
    private flashMessagesService: FlashMessagesService,
  ) { }

  ngOnInit() {

   const AlbumObserve= this.albumService.GetAlbum();
   AlbumObserve.subscribe(res =>{
     if(res) {
       this.album = res;
       console.log(this.album.ID)
       sessionStorage.setItem('album', JSON.stringify(res));
       this.pictures = res.ImgPaths;
     }
     else{
       this.album = JSON.parse(sessionStorage.getItem('album'));
     }

   })


    this.imageForm = new FormGroup({
      image: new FormControl('', Validators.required)
    })
  }

  get f() { return this.imageForm.controls;}

  private  readAndUploadFile(theFile: any) {
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
        let img = new ImgPath(resp,this.album.ID);
        console.log(this.album.ID)
        this.album.ImgPaths.push(img);
        sessionStorage.setItem('album', JSON.stringify(this.album));
        this.theFile = null;
        this.userService.addImgToAlbum(img).subscribe();
        if(resp){
          this.flashMessagesService.show('Dodano zdjęcie!', {cssClass: 'alert-success', timeout: 3000})
        }else {
          this.flashMessagesService.show('Ups! Coś poszło nie tak.', {cssClass: 'alert-danger'})
        }
      });
    }
    // Read the file
    reader.readAsDataURL(theFile);
    console.log("end readAndUploadFile")
  }

  onFileChange(event,id:number) {
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

          this.newPicture=reader.result;
          this.readAndUploadFile(this.theFile);

        })
      }
      else {
        // Display error message
        this.messages.push("File: " + event.target.files[0].name + " is too large to upload.");
      }
    }
  }
  imageSubmit(id:number) {
    // this.readAndUploadFile(this.theFile, id);
  }

}
