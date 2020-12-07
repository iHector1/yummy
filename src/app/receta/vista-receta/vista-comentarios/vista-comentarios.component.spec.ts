import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VistaComentariosComponent } from './vista-comentarios.component';

describe('VistaComentariosComponent', () => {
  let component: VistaComentariosComponent;
  let fixture: ComponentFixture<VistaComentariosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VistaComentariosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VistaComentariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
