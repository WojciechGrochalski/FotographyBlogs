import { Component, OnInit } from '@angular/core';
import * as Editor from '../../../ckeditor5/ckeditor'
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Article } from '../../../models/Article'
import { FormGroup, FormBuilder, Validator, Validators } from '@angular/forms'
import { FlashMessagesService } from 'angular2-flash-messages';
import { ArticleService } from 'src/app/services/article.service';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

class ImageModel {
  constructor(
    public imageSrc: string,
    public file: File
  ){}
}

@Component({
  selector: 'app-edit-article',
  templateUrl: './edit-article.component.html',
  styleUrls: ['./edit-article.component.css']
})
export class EditArticleComponent implements OnInit {

  public Editor = Editor;
  public tagname = "textarea"
  article: Article;
  editForm: FormGroup;
  submitted = false;
  selectedImage: ImageModel;
  imageSrc: string;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private articleService: ArticleService,
    private router: Router, 
    private flashMessagesService: FlashMessagesService
  ) { }

  ngOnInit() {
    
    const id = +this.route.snapshot.paramMap.get('id');
    this.articleService.getArticle(id).subscribe(article => this.article = article)

    this.imageSrc = this.article.image.imageSrc

    this.editForm = this.formBuilder.group({
      title: [this.article.title, Validators.required],
      image: [''],
      content: [this.article.content, Validators.required]
    })
  }

  onFileChange(event) {
    const reader = new FileReader();
    const file: File = event.target.files[0];

    if (file) {
      reader.readAsDataURL(file);

      reader.onload = () => { 
        this.imageSrc = reader.result as string
        this.selectedImage = new ImageModel(reader.result as string, file); 
        this.editForm.patchValue({
          image: reader.result 
        })
      }      
    }
  }
 
  articleSubmit() {
    this.submitted = true;
    if (this.editForm.invalid) {
      return this.flashMessagesService.show('Nie dokonano żadnych zmian!', {cssClass: 'alert-danger'})
    }

    let editedArticle: Article = {
      id: this.article.id,
      title: this.editForm.controls['title'].value,
      content: this.editForm.controls['content'].value,
      image: this.editForm.controls['image'].value,
      date: new Date().toLocaleDateString(),
      author: 'testAuthor', 
      views: this.article.views
    }

    // Dodać w serwisie URL do API na backendzie
    this.articleService.editArticle(editedArticle)
      .subscribe(article => {
      if (article) {
        this.router.navigate(['/dashboard/artykuly'])
        this.flashMessagesService.show('Artykuł edytowany!', {cssClass: 'alert-success', timeout: 3000})
      } else {
        this.flashMessagesService.show('Ups! Coś poszło nie tak.', {cssClass: 'alert-danger'})
      }
    })
  }

}
