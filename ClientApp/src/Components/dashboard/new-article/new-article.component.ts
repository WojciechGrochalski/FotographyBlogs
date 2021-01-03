import { Component, OnInit } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { FormGroup, FormBuilder,Validators } from '@angular/forms'
import { Router, ActivatedRoute } from '@angular/router'
import { ArticlesService } from '../../../Services/Articles.service'
import { FlashMessagesService } from 'angular2-flash-messages'
import {ImageSnippet} from '../../../models/Image'
import {FileToUpload} from '../../../models/File';
import {UsersService} from '../../../Services/Users.service';
import {Article} from '../../../models/Article';

const MAX_SIZE: number = 4194304;
@Component({
  selector: 'app-new-article',
  templateUrl: './new-article.component.html',
  styleUrls: ['./new-article.component.css']
})
export class NewArticleComponent implements OnInit {

  public Editor = ClassicEditor;
  public tagname = "textarea"
  articleForm: FormGroup;
  submitted = false;
  selectedImage: ImageSnippet;
  imageSrc: string | ArrayBuffer;
  profileForm: FormGroup;
  file: File = null; // Variable to store file
  theFile: any = null;


  constructor(
    private formBuilder: FormBuilder,
    private articleService: ArticlesService,
    private router: Router,
    private flashMessagesService: FlashMessagesService,
    private userService: UsersService) { }

  ngOnInit() {
    this.articleForm = this.formBuilder.group({
      title: ['', Validators.required],
      content: ['', Validators.required]
    })
  }

  get f() {
    return this.articleForm.controls;
  }

  onFileChange(event) {
    this.theFile = null;
    if (event.target.files && event.target.files.length > 0) {
      // Don't allow file sizes over 1MB
      if (event.target.files[0].size < MAX_SIZE) {
        // Set theFile property
      //  console.log(event.target.files[0]);
        this.theFile = event.target.files[0];
        let reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);
        reader.onload=(event=>{
          this.imageSrc=reader.result;
        })
      }
      else {
        // Display error message

      }
    }
  }

  articleSubmit() {
    this.submitted = true;
    if (this.theFile==null) {
      return this.flashMessagesService.show('Wszystkie pola są wymagane!', {cssClass: 'alert-danger'})
    }
    if(!this.f.title.value ){
      return this.flashMessagesService.show('Wszystkie pola są wymagane!', {cssClass: 'alert-danger'})
    }
    if(!this.f.content.value==null){
      return this.flashMessagesService.show('Wszystkie pola są wymagane!', {cssClass: 'alert-danger'})
    }
    this.readAndUploadFile(this.theFile);
    // Dodać w serwisie URL do API na backendzie

  }

  private readAndUploadFile(theFile: any) {
    console.log(this.theFile)
    let file = new FileToUpload();
    // Set File Information
    file.fileName = theFile.name;
    file.fileSize = theFile.size;
    file.fileType = theFile.type;
    file.lastModifiedTime = theFile.lastModified;
    file.lastModifiedDate = theFile.lastModifiedDate;
    let reader = new FileReader();
    // Setup onload event for reader
    reader.onload = async () => {
      // Store base64 encoded representation of file
      file.fileAsBase64 = reader.result.toString();
      // POST to server
      this.userService.uploadFile(file).subscribe(resp => {
        this.submitted = true;
        console.log("if")
        let date_now = new Date().toLocaleDateString();
        let AuthorID: number= +sessionStorage.getItem('userID');
        let newArticle = new Article(
          this.f.title.value, sessionStorage.getItem('userName'), this.f.content.value, date_now, resp,AuthorID);
        console.log("send article")
       this.articleService.AddArticle(newArticle).subscribe(res => {
          if (res) {
            this.router.navigate(['/dashboard/articles'])
            console.log("success")
          //  window.location.reload();
            this.flashMessagesService.show('Profil został zaktualizowany', {cssClass: 'alert-success', timeout: 3000})

          } else {
            this.flashMessagesService.show('Ups! Coś poszło nie tak.', {cssClass: 'alert-danger'})
          }
        });
      })

    }
    // Read the file
    reader.readAsDataURL(theFile);
    console.log("end readAndUploadFile")
  }
}
