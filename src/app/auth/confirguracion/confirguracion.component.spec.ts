import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirguracionComponent } from './confirguracion.component';

describe('ConfirguracionComponent', () => {
  let component: ConfirguracionComponent;
  let fixture: ComponentFixture<ConfirguracionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirguracionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirguracionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
