import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionHelpComponent } from './option-help.component';

describe('OptionHelpComponent', () => {
  let component: OptionHelpComponent;
  let fixture: ComponentFixture<OptionHelpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OptionHelpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OptionHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
