import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PremiumRoutingModule } from './premium-routing.module';
import { PremiumComponent } from './premium.component';
import { AngularMaterialModule } from '../Angular_Material/angular_materia.module';


@NgModule({
  declarations: [PremiumComponent],
  imports: [
    CommonModule,
    PremiumRoutingModule,
    AngularMaterialModule
  ]
})
export class PremiumModule { }
