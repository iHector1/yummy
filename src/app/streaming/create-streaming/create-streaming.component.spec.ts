import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateStreamingComponent } from './create-streaming.component';

describe('CreateStreamingComponent', () => {
  let component: CreateStreamingComponent;
  let fixture: ComponentFixture<CreateStreamingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateStreamingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateStreamingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
