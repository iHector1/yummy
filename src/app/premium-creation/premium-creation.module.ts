import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PremiumCreationRoutingModule } from './premium-creation-routing.module';
import { PremiumCreationComponent } from './premium-creation.component';
import { AngularMaterialModule } from '../Angular_Material/angular_materia.module';


@NgModule({
  declarations: [PremiumCreationComponent],
  imports: [
    CommonModule,
    PremiumCreationRoutingModule,
    AngularMaterialModule
  ]
})
export class PremiumCreationModule { }
