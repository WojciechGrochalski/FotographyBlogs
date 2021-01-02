import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Article } from '../../../models/Article'
import { FormGroup, FormBuilder, Validator, Validators } from '@angular/forms'
import { FlashMessagesService } from 'angular2-flash-messages';
import * as Editor from '../../../app/ckeditor5/ckeditor'

import {ArticlesService} from '../../../Services/Articles.service';
import {Album} from '../../../models/Album';
import {ImageSnippet} from '../../../models/Image';
import {ChangeEvent} from '@ckeditor/ckeditor5-angular';
const MAX_SIZE: number = 4194304;


@Component({
  selector: 'app-edit-article',
  templateUrl: './edit-article.component.html',
  styleUrls: ['./edit-article.component.css']
})
export class EditArticleComponent implements OnInit {

  public Editor = Editor;
  public tagname = "textarea"
  public article = {} as Article;
  public a = {} as Article;
  editForm= new FormGroup({});
  submitted = false;
  imageSrc: string | ArrayBuffer;
  pictures: string[];
  album: Album;
  imageForm: FormGroup;
  imageAlt: string;
  newPicture: ImageSnippet;
  theFile: any = null;
  messages: string[] = [];
  url:string | ArrayBuffer;
  loading: boolean = false; // Flag variable
  file: File = null; // Variable to store file
  defaultValue: string = 'write a comment...';

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private articleService: ArticlesService,
    private router: Router,
    private flashMessagesService: FlashMessagesService
  ) { }

  async ngOnInit() {

    // const id = +this.route.snapshot.paramMap.get('id');
    //   await this.articleService.GetArticleWithID(id).subscribe((res: Article)=>{
    //    this.article=res;
    //    this.defaultValue=res.Title;
    //    this.imageSrc=res.Img;
    //    console.log(JSON.stringify(res));
    //     console.log(this.article.Img +' 2');
    //     this.a= this.article;
    //     console.log(this.a.Title+"  a");
    // });
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
