import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlannedRecipesRoutingModule } from './planned-recipes-routing.module';
import { PlannedRecipesComponent } from './planned-recipes.component';
import { RecipesComponent } from './recipes/recipes.component';
import { AngularMaterialModule } from '../Angular_Material/angular_materia.module';


@NgModule({
  declarations: [PlannedRecipesComponent, RecipesComponent],
  imports: [
    CommonModule,
    PlannedRecipesRoutingModule,
    AngularMaterialModule
  ]
})
export class PlannedRecipesModule { }
