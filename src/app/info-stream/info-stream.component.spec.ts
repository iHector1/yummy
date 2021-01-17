import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoStreamComponent } from './info-stream.component';

describe('InfoStreamComponent', () => {
  let component: InfoStreamComponent;
  let fixture: ComponentFixture<InfoStreamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoStreamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoStreamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
