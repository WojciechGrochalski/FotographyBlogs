import { Component, OnInit } from '@angular/core';
import * as Editor from '../../../app/ckeditor5/ckeditor'
import { FormGroup, FormBuilder,Validators } from '@angular/forms'
import { Router, ActivatedRoute } from '@angular/router'
import { FlashMessagesService } from 'angular2-flash-messages'
import {PostService} from '../../../Services/post.service';
import {Post} from '../../../models/Post';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent implements OnInit {


  public Editor = Editor;
  public tagname = "textarea"
  postForm: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private postService: PostService,
    private router: Router,
    private flashMessagesService: FlashMessagesService ) { }

  ngOnInit() {
    this.postForm = this.formBuilder.group({
      title: ['', Validators.required],
      content: ['', Validators.required]
    })
  }
  get f() {
    return this.postForm.controls;
  }

  postSubmit() {
    this.submitted = true;
    if (this.postForm.invalid) {
      return this.flashMessagesService.show('Wszystkie pola są wymagane!', {cssClass: 'alert-danger'})
    }
    else{
      this.submitted = true;
      let date_now = new Date().toLocaleDateString();
      let newPost = new Post(
        this.f.title.value, this.f.content.value, date_now, sessionStorage.getItem('userName'));
      console.log("send article")
      this.postService.AddPost(newPost).subscribe(res => {
        if (res) {
          this.router.navigate(['/dashboard/mypost'])
          console.log("success")
          this.flashMessagesService.show('Profil został zaktualizowany', {cssClass: 'alert-success', timeout: 3000})

        } else {
          this.flashMessagesService.show('Ups! Coś poszło nie tak.', {cssClass: 'alert-danger'})
        }
      });
    }

  }
}
