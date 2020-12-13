import {Component, EventEmitter, OnInit, Output} from '@angular/core';

import {Post} from '../../models/Post';
import {ArticleService} from '../../Services/article.service';
import {PostService} from '../../Services/post.service';
import {FileToUpload} from '../../models/File';

const MAX_SIZE: number = 4194304;

@Component({
  selector: 'app-post-forum',
  templateUrl: './post-forum.component.html',
  styleUrls: ['./post-forum.component.css']
})


export class PostForumComponent implements OnInit {
  theFile: any = null;
  messages: string[] = [];
  //uploud
  formData: FormData;
  fileToUpload: File;
  url:string;
  shortLink: string = "";
  loading: boolean = false; // Flag variable
  file: File = null; // Variable to store file

  posts: Post[]=[];
  canAddPost: boolean=false;

  constructor( private  articleService: ArticleService, private postService: PostService) { }

 async ngOnInit() {
    try {
      this.posts = await this.postService.GetPostsFromDB().toPromise();
      console.log("Get new post ");
    }
    catch (e){
      console.error(e);
    }

  }
  onChange(event) {
    this.file = event.target.files[0];
  }
  Switch(){
    this.canAddPost=true;
  }
  ExitTemplate(){
    this.canAddPost=false;
  }
  SavePost(title: string, content: string){
    let date_now = new Date().toLocaleDateString();
    console.log('Data time now',date_now)
    let post = new Post(title,content,date_now,sessionStorage.getItem('userName'));


    // this.postService.uploadFile( this.formData).subscribe(event => {
    //   if (event.type === HttpEventType.UploadProgress)
    //     this.progress = Math.round(100 * event.loaded / event.total);
    //   else if (event.type === HttpEventType.Response) {
    //     this.message = 'Upload success.';
    //     this.onUploadFinished.emit(event.body);
    //   }
    // });


  }
  // public uploadFile = (files) => {
  //   if (files.length === 0) {
  //     return;
  //   }
  //   this.fileToUpload = <File>files[0];
  //   this.formData = new FormData();
  //   this.formData.append('file', this.fileToUpload, this.fileToUpload.name);
  //    this.postService.uploadFile( this.formData).subscribe();//(event => {
  //   //   if (event.type === HttpEventType.UploadProgress)
  //   //     this.progress = Math.round(100 * event.loaded / event.total);
  //   //   else if (event.type === HttpEventType.Response) {
  //   //     this.message = 'Upload success.';
  //   //     this.onUploadFinished.emit(event.body);
  //   //   }
  //   // });
  //    this.postService.getUrl().subscribe(res=>{
  //      this.url=res;
  //    })
  // }
  //
  // onUpload() {
  //   this.loading = !this.loading;
  //   console.log(this.file);
  //   this.postService.uploadFile(this.file).subscribe(
  //     (event: any) => {
  //       if (typeof (event) === 'object') {
  //
  //         // Short link via api response
  //         this.shortLink = event.link;
  //
  //         this.loading = false; // Flag variable
  //       }
  //     }
  //   );
  //   this.postService.getUrl().subscribe(res =>{
  //     this.url=res;
  //   })
  // }
  private readAndUploadFile(theFile: any) {
    let file = new FileToUpload();

    // Set File Information
    file.fileName = theFile.name;
    file.fileSize = theFile.size;
    file.fileType = theFile.type;
    file.lastModifiedTime = theFile.lastModified;
    file.lastModifiedDate = theFile.lastModifiedDate;

    // Use FileReader() object to get file to upload
    // NOTE: FileReader only works with newer browsers
    let reader = new FileReader();

    // Setup onload event for reader
    reader.onload = () => {
      // Store base64 encoded representation of file
      file.fileAsBase64 = reader.result.toString();
      console.log('resp.toString()');
      // POST to server
      this.postService.uploadFile(file).subscribe(resp => {
        this.messages.push("Upload complete");
        this.url=resp.toString();
        console.log(resp.toString());
      });

    }

    // Read the file
    reader.readAsDataURL(theFile);
  }

  uploadFile(): void {
    this.readAndUploadFile(this.theFile);
  }

  onFileChange(event) {
    this.theFile = null;

    if (event.target.files && event.target.files.length > 0) {
      // Don't allow file sizes over 1MB
      if (event.target.files[0].size < MAX_SIZE) {
        // Set theFile property
        this.theFile = event.target.files[0];
      }
      else {
        // Display error message
        this.messages.push("File: " + event.target.files[0].name + " is too large to upload.");
      }
    }
  }

}
