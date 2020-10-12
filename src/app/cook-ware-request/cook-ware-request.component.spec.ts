import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CookWareRequestComponent } from './cook-ware-request.component';

describe('CookWareRequestComponent', () => {
  let component: CookWareRequestComponent;
  let fixture: ComponentFixture<CookWareRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CookWareRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CookWareRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
