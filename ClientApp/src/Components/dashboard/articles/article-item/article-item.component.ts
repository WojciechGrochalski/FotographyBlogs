import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Article } from '../../../../models/Article'
import { Router} from '@angular/router'

@Component({
  selector: 'app-article-item',
  templateUrl: './article-item.component.html',
  styleUrls: ['./article-item.component.css']
})
export class ArticleItemComponent implements OnInit {

  @Input() article: Article;
  @Output() deleteArticle: EventEmitter<Article> = new EventEmitter()

  constructor(private router: Router) { }

  ngOnInit() {
  }

  onDelete(article) {
    this.deleteArticle.emit(article)
  }

}
