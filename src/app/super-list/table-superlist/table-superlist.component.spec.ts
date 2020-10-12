import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableSuperlistComponent } from './table-superlist.component';

describe('TableSuperlistComponent', () => {
  let component: TableSuperlistComponent;
  let fixture: ComponentFixture<TableSuperlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableSuperlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableSuperlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
