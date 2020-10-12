import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCupboardComponent } from './add-cupboard.component';

describe('AddCupboardComponent', () => {
  let component: AddCupboardComponent;
  let fixture: ComponentFixture<AddCupboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCupboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCupboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
