import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Article } from '../../../models/Article'
import { FormGroup, FormBuilder, Validator, Validators } from '@angular/forms'
import { FlashMessagesService } from 'angular2-flash-messages';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {ArticlesService} from '../../../Services/Articles.service';
import {Album} from '../../../models/Album';
import {ChangeEvent} from '@ckeditor/ckeditor5-angular';


const MAX_SIZE: number = 4194304;

@Component({
  selector: 'app-edit-article',
  templateUrl: './edit-article.component.html',
  styleUrls: ['./edit-article.component.css']
})
export class EditArticleComponent implements OnInit {

  public Editor = ClassicEditor;
  public onReady( editor ) {
    editor.ui.view.editable.element.parentElement.insertBefore(
      editor.ui.view.toolbar.element,
      editor.ui.view.editable.element
    );
  }
  public tagname = "textarea"
  public article = {} as Article;
  public a = {} as Article;
  editForm= new FormGroup({});
  submitted = false;
  imageSrc: string | ArrayBuffer;
  album: Album;
  theFile: any = null;
  messages: string[] = [];
  url:string | ArrayBuffer;
  loading: boolean = false; // Flag variable
  file: File = null; // Variable to store file


  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private articleService: ArticlesService,
    private router: Router,
    private flashMessagesService: FlashMessagesService
  ) { }

  async ngOnInit() {

    const articleObservable = this.articleService.GetArticle();
    articleObservable.subscribe((res: Article) => {
      if(res) {
        this.article = res;
        console.log(res.Title);
        sessionStorage.setItem('article',JSON.stringify(res) );
      }
      else{
        this.article= JSON.parse(sessionStorage.getItem('article')) ;
      }
    });


    this.editForm = this.formBuilder.group({
      title: [this.article.Title, Validators.required],
      image: [''],
      content: [this.article.Content, Validators.required]
    })
  }

  onFileChange(event) {
    console.log(this.article);
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

  articleSubmit() {
    this.submitted = true;




    // Dodać w serwisie URL do API na backendzie
    this.articleService.EditArticle(this.article)
      .subscribe(article => {
      if (article) {
        this.flashMessagesService.show('Artykuł edytowany!', {cssClass: 'alert-success', timeout: 3000})
        this.router.navigate(['/dashboard/articles'])
      } else {
        this.flashMessagesService.show('Ups! Coś poszło nie tak.', {cssClass: 'alert-danger'})
      }
    })
  }

  onChange( { editor }: ChangeEvent ) {
    this.article.Content = editor.getData();
  }
  onKey(event) {
    this.article.Title = event.target.value;
  }

}
