import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeSavedComponent } from './recipe-saved.component';

describe('RecipeSavedComponent', () => {
  let component: RecipeSavedComponent;
  let fixture: ComponentFixture<RecipeSavedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecipeSavedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeSavedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
