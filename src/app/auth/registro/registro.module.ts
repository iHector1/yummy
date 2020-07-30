import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegistroRoutingModule } from './registro-routing.module';
import { RegistroComponent } from './registro.component';
import {AngularMaterialModule } from "../../Angular_Material/angular_materia.module";
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [RegistroComponent],
  imports: [
    CommonModule,
    RegistroRoutingModule,
    FormsModule,
    AngularMaterialModule,
    ReactiveFormsModule
  ]
})
export class RegistroModule { }
