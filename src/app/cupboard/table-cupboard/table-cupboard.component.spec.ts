import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableCupboardComponent } from './table-cupboard.component';

describe('TableCupboardComponent', () => {
  let component: TableCupboardComponent;
  let fixture: ComponentFixture<TableCupboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableCupboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableCupboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
