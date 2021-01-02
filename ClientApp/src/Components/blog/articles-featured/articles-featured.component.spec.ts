import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticlesFeaturedComponent } from './articles-featured.component';

describe('ArticlesFeaturedComponent', () => {
  let component: ArticlesFeaturedComponent;
  let fixture: ComponentFixture<ArticlesFeaturedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticlesFeaturedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticlesFeaturedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
