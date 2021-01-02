import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticlesRecentComponent } from './articles-recent.component';

describe('ArticlesRecentComponent', () => {
  let component: ArticlesRecentComponent;
  let fixture: ComponentFixture<ArticlesRecentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticlesRecentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticlesRecentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
