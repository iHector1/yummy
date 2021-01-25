import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionCommentComponent } from './option-comment.component';

describe('OptionCommentComponent', () => {
  let component: OptionCommentComponent;
  let fixture: ComponentFixture<OptionCommentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OptionCommentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OptionCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
