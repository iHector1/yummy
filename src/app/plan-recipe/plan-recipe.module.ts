import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlanRecipeRoutingModule } from './plan-recipe-routing.module';
import { PlanRecipeComponent } from './plan-recipe.component';


@NgModule({
  declarations: [PlanRecipeComponent],
  imports: [
    CommonModule,
    PlanRecipeRoutingModule
  ]
})
export class PlanRecipeModule { }
