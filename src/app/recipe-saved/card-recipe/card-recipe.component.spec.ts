import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardRecipeComponent } from './card-recipe.component';

describe('CardRecipeComponent', () => {
  let component: CardRecipeComponent;
  let fixture: ComponentFixture<CardRecipeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardRecipeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardRecipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
