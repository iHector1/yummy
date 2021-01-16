import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NameUserComponent } from './name-user.component';

describe('NameUserComponent', () => {
  let component: NameUserComponent;
  let fixture: ComponentFixture<NameUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NameUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NameUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
