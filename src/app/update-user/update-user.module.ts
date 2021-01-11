import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UpdateUserRoutingModule } from './update-user-routing.module';
import { UpdateUserComponent } from './update-user.component';
import { AngularMaterialModule } from '../Angular_Material/angular_materia.module';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [UpdateUserComponent],
  imports: [
    CommonModule,
    UpdateUserRoutingModule,
    AngularMaterialModule,
    MatDialogModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class UpdateUserModule { }
