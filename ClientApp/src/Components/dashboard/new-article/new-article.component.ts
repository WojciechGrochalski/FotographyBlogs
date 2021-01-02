import { Component, OnInit } from '@angular/core';
import * as Editor from '../../../ckeditor5/ckeditor'
import { FormGroup, FormBuilder,Validators } from '@angular/forms'
import { Router, ActivatedRoute } from '@angular/router'
import { ArticleService } from '../../../services/article.service'
import { FlashMessagesService } from 'angular2-flash-messages'
import {ImageSnippet} from '../../../models/Image'

@Component({
  selector: 'app-new-article',
  templateUrl: './new-article.component.html',
  styleUrls: ['./new-article.component.css']
})
export class NewArticleComponent implements OnInit {

  public Editor = Editor;
  public tagname = "textarea"
  articleForm: FormGroup;
  submitted = false;
  selectedImage: ImageSnippet;
  imageSrc: string;

  constructor(
    private formBuilder: FormBuilder,
    private articleService: ArticleService,
    private router: Router, 
    private flashMessagesService: FlashMessagesService
  ) { }

  ngOnInit() {
    this.articleForm = this.formBuilder.group({
      title: ['', Validators.required],
      image: ['', Validators.required],
      content: ['', Validators.required]
    })
  }

  get f() { return this.articleForm.controls;}
  
  onFileChange(event) {
    const reader = new FileReader();
    const file: File = event.target.files[0];
    if (file) {
      reader.readAsDataURL(file);
      // console.log(file)
      reader.onload = () => { 
        this.imageSrc = reader.result as string
        this.selectedImage = {imageSrc: this.imageSrc, file}; 
        this.articleForm.patchValue({
          image: {
            imageSrc: reader.result as string,
            file
          }
        })
      }      
    }
  }

  articleSubmit() {
    this.submitted = true;
    if (this.articleForm.invalid) {
      return this.flashMessagesService.show('Wszystkie pola są wymagane!', {cssClass: 'alert-danger'})
    }

    // Dodać w serwisie URL do API na backendzie
    this.articleService.addArticle(
      this.f.title.value,
      this.f.content.value,
      this.f.image.value)
      .subscribe(article => {
        if (article) {
          this.router.navigate(['/dashboard/articles'])
          this.flashMessagesService.show('Artykuł dodany!', {cssClass: 'alert-success', timeout: 3000})
        } else {
          this.flashMessagesService.show('Ups! Coś poszło nie tak.', {cssClass: 'alert-danger'})
        }
    })
  }

}
