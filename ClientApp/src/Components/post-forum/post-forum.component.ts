import {Component, DoCheck, OnInit} from '@angular/core';
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


export class PostForumComponent implements OnInit, DoCheck {
  theFile: any = null;
  messages: string[] = [];
  url:string | ArrayBuffer;
  UrlToPostImg: string = null;
  loading: boolean = false; // Flag variable
  file: File = null; // Variable to store file
  PostReady: boolean=false;
  posts: Post[]=[];
  IsUser: string;
  canAddPost: boolean=false;

  constructor(
    private articleService: ArticleService,
    private postService: PostService){ }

 async ngOnInit() {
   this.IsUser=sessionStorage.getItem('userName');
    try {
      this.posts = await this.postService.GetPostsFromDB().toPromise();
      console.log("Get new post ");
    }
    catch (e){
      console.error(e);
    }
  }
  ngDoCheck() {
    if(this.IsUser!=sessionStorage.getItem('userName') ){
      this.IsUser=sessionStorage.getItem('userName');
    }
  }

  async SavePost(title: string, content: string) {
    let date_now = new Date().toLocaleDateString();
    console.log('Data time now', date_now)
    let post = await new Post(title, content, date_now, sessionStorage.getItem('userName'), this.UrlToPostImg);
    await this.postService.AddPost(post).subscribe(res => {
      if (res) {
        window.location.reload();
      }
    });
  }


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
     this.postService.uploadFile(file).subscribe(resp => {
        this.messages.push("Upload complete");
        this.UrlToPostImg=resp;
        console.log(this.UrlToPostImg, 'from upload');
      });
    }
    // Read the file
    reader.readAsDataURL(theFile);
  }

  uploadFile() {
    this.readAndUploadFile(this.theFile);
    this.PostReady=true;
  }

  onFileChange(event) {
    this.theFile = null;
    if (event.target.files && event.target.files.length > 0) {
      // Don't allow file sizes over 1MB
      if (event.target.files[0].size < MAX_SIZE) {
        // Set theFile property
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
  Switch(){
    this.canAddPost=true;
  }
  ExitTemplate(){
    this.canAddPost=false;
  }

}
