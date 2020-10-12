import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CupboardRoutingModule } from './cupboard-routing.module';
import { CupboardComponent } from './cupboard.component';
import { TableCupboardComponent } from './table-cupboard/table-cupboard.component';
import { AddCupboardComponent } from './add-cupboard/add-cupboard.component';
import { AngularMaterialModule } from '../Angular_Material/angular_materia.module';

@NgModule({
  declarations: [CupboardComponent, TableCupboardComponent, AddCupboardComponent],
  imports: [
    CommonModule,
    CupboardRoutingModule,
    AngularMaterialModule
  ]
})
export class CupboardModule { }
