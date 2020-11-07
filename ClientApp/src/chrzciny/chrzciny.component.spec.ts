import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChrzcinyComponent } from './chrzciny.component';

describe('ChrzcinyComponent', () => {
  let component: ChrzcinyComponent;
  let fixture: ComponentFixture<ChrzcinyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChrzcinyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChrzcinyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
