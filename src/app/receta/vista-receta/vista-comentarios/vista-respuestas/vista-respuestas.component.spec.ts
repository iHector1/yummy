import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VistaRespuestasComponent } from './vista-respuestas.component';

describe('VistaRespuestasComponent', () => {
  let component: VistaRespuestasComponent;
  let fixture: ComponentFixture<VistaRespuestasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VistaRespuestasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VistaRespuestasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
