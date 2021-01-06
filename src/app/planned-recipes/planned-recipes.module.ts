import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlannedRecipesRoutingModule } from './planned-recipes-routing.module';
import { PlannedRecipesComponent } from './planned-recipes.component';


@NgModule({
  declarations: [PlannedRecipesComponent],
  imports: [
    CommonModule,
    PlannedRecipesRoutingModule
  ]
})
export class PlannedRecipesModule { }
