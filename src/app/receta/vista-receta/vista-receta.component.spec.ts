import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VistaRecetaComponent } from './vista-receta.component';

describe('VistaRecetaComponent', () => {
  let component: VistaRecetaComponent;
  let fixture: ComponentFixture<VistaRecetaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VistaRecetaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VistaRecetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
