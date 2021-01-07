import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlanRecipeRoutingModule } from './plan-recipe-routing.module';
import { PlanRecipeComponent } from './plan-recipe.component';
import { AngularMaterialModule } from '../Angular_Material/angular_materia.module';
import { MatDialogModule } from '@angular/material/dialog';


@NgModule({
  declarations: [PlanRecipeComponent],
  imports: [
    CommonModule,
    PlanRecipeRoutingModule,
    AngularMaterialModule,
    MatDialogModule
  ]
})
export class PlanRecipeModule { }
