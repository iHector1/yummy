import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OptionHelpRoutingModule } from './option-help-routing.module';
import { OptionHelpComponent } from './option-help.component';
import { AngularMaterialModule } from '../Angular_Material/angular_materia.module';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [OptionHelpComponent],
  imports: [
    CommonModule,
    OptionHelpRoutingModule,
    AngularMaterialModule,
    MatDialogModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class OptionHelpModule { }
