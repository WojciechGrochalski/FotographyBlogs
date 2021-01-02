import { Component, OnInit } from '@angular/core';
import {Article} from '../../../models/Article';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import {Album} from '../../../models/Album';
import {ImageSnippet} from '../../../models/Image';
import {ActivatedRoute, Router} from '@angular/router';
import {ArticlesService} from '../../../Services/Articles.service';
import {FlashMessagesService} from 'angular2-flash-messages';
import * as Editor from '../../../app/ckeditor5/ckeditor'
import {PostService} from '../../../Services/post.service';
import {Post} from '../../../models/Post';
import {ChangeEvent} from '@ckeditor/ckeditor5-angular';
@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit {
  post: Post;
  public Editor = Editor;
  public tagname = "textarea"
  editForm= new FormGroup({});
  submitted = false;


  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private postService: PostService,
    private router: Router,
    private flashMessagesService: FlashMessagesService
  ) { }

  async ngOnInit() {

    const postObservable = this.postService.GetPost();
    postObservable.subscribe((res: Post) => {
      if(res) {
        this.post = res;
        sessionStorage.setItem('post',JSON.stringify(res) );

      }
      else{
        this.post= JSON.parse(sessionStorage.getItem('post')) ;
      }
    });


    this.editForm = this.formBuilder.group({
      title: [this.post.Title, Validators.required],
      content: [this.post.Content, Validators.required]
    })
  }


  articleSubmit(f: NgForm) {
    this.submitted = true;

    let editedPost = new Post (
      this.editForm.controls['title'].value,
      this.editForm.controls['content'].value,
      new Date().toLocaleDateString(),
      sessionStorage.getItem('userName')
    )
    editedPost.ID=this.post.ID;

    console.log(this.post.Content)
    console.log(this.post.Title)

    // Dodać w serwisie URL do API na backendzie
    this.postService.EditPost(this.post)
      .subscribe(post=> {
        if (post) {
          this.flashMessagesService.show('Post edytowany!', {cssClass: 'alert-success', timeout: 3000})
          this.router.navigate(['/dashboard/mypost'])
        } else {
          this.flashMessagesService.show('Ups! Coś poszło nie tak.', {cssClass: 'alert-danger'})
        }
      })
  }

  onChange( { editor }: ChangeEvent ) {
    this.post.Content = editor.getData();
  }
  onKey(event) {
  this.post.Title = event.target.value;
  }
}
