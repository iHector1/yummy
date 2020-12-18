import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PremiumCreationRoutingModule } from './premium-creation-routing.module';
import { PremiumCreationComponent } from './premium-creation.component';
import { AngularMaterialModule } from '../Angular_Material/angular_materia.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [PremiumCreationComponent],
  imports: [
    CommonModule,
    PremiumCreationRoutingModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class PremiumCreationModule { }
 