import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllstreamingComponent } from './allstreaming.component';

describe('AllstreamingComponent', () => {
  let component: AllstreamingComponent;
  let fixture: ComponentFixture<AllstreamingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllstreamingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllstreamingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
