import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CupboardComponent } from './cupboard.component';

describe('CupboardComponent', () => {
  let component: CupboardComponent;
  let fixture: ComponentFixture<CupboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CupboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CupboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
