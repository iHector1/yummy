import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SuperListRoutingModule } from './super-list-routing.module';
import { SuperListComponent } from './super-list.component';
import { TableSuperlistComponent } from './table-superlist/table-superlist.component';;
import { AngularMaterialModule } from '../Angular_Material/angular_materia.module';


@NgModule({
  declarations: [SuperListComponent, TableSuperlistComponent],
  imports: [
    CommonModule,
    SuperListRoutingModule,
    AngularMaterialModule
  ]
})
export class SuperListModule { }
