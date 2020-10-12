import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleRecipesComponent } from './schedule-recipes.component';

describe('ScheduleRecipesComponent', () => {
  let component: ScheduleRecipesComponent;
  let fixture: ComponentFixture<ScheduleRecipesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScheduleRecipesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduleRecipesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
