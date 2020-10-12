import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PremiumCreationComponent } from './premium-creation.component';

describe('PremiumCreationComponent', () => {
  let component: PremiumCreationComponent;
  let fixture: ComponentFixture<PremiumCreationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PremiumCreationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PremiumCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
