import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewstreamingComponent } from './viewstreaming.component';

describe('ViewstreamingComponent', () => {
  let component: ViewstreamingComponent;
  let fixture: ComponentFixture<ViewstreamingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewstreamingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewstreamingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
