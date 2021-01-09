import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionRecipeComponent } from './option-recipe.component';

describe('OptionRecipeComponent', () => {
  let component: OptionRecipeComponent;
  let fixture: ComponentFixture<OptionRecipeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OptionRecipeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OptionRecipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
