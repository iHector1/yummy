import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlannedRecipesComponent } from './planned-recipes.component';

describe('PlannedRecipesComponent', () => {
  let component: PlannedRecipesComponent;
  let fixture: ComponentFixture<PlannedRecipesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlannedRecipesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlannedRecipesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
