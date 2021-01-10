import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UpdateRecipeRoutingModule } from './update-recipe-routing.module';
import { UpdateRecipeComponent } from './update-recipe.component';
import { AngularMaterialModule } from '../Angular_Material/angular_materia.module';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [UpdateRecipeComponent],
  imports: [
    CommonModule,
    UpdateRecipeRoutingModule,
    AngularMaterialModule,
    MatDialogModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class UpdateRecipeModule { }
