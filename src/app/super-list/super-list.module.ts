import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SuperListRoutingModule } from './super-list-routing.module';
import { SuperListComponent } from './super-list.component';
import { AngularMaterialModule } from '../Angular_Material/angular_materia.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [SuperListComponent],
  imports: [
    CommonModule,
    SuperListRoutingModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class SuperListModule { }
