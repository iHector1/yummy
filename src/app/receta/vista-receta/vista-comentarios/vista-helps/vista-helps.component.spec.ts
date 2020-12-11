import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VistaHelpsComponent } from './vista-helps.component';

describe('VistaHelpsComponent', () => {
  let component: VistaHelpsComponent;
  let fixture: ComponentFixture<VistaHelpsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VistaHelpsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VistaHelpsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
