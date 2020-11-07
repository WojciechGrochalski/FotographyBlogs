import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-article-template',
  templateUrl: './article-template.component.html',
  styleUrls: ['./article-template.component.css']
})
export class ArticleTemplateComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }
  Content: string;
  ngOnInit(): void {
    this.Content = this.route.snapshot.paramMap.get('content');

  }

}
