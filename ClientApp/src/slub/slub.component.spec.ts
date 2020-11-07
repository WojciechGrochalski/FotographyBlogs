import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlubComponent } from './slub.component';

describe('SlubComponent', () => {
  let component: SlubComponent;
  let fixture: ComponentFixture<SlubComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SlubComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SlubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
