import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecipeSavedRoutingModule } from './recipe-saved-routing.module';
import { RecipeSavedComponent } from './recipe-saved.component';
import { AngularMaterialModule } from '../Angular_Material/angular_materia.module';
import { CardRecipeComponent } from './card-recipe/card-recipe.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [RecipeSavedComponent, CardRecipeComponent],
  imports: [
    CommonModule,
    RecipeSavedRoutingModule,
    AngularMaterialModule,
    ReactiveFormsModule
  ]
})
export class RecipeSavedModule { }
