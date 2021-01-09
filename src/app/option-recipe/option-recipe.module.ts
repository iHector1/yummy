import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OptionRecipeRoutingModule } from './option-recipe-routing.module';
import { OptionRecipeComponent } from './option-recipe.component';
import { AngularMaterialModule } from '../Angular_Material/angular_materia.module';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [OptionRecipeComponent],
  imports: [
    CommonModule,
    OptionRecipeRoutingModule,
    AngularMaterialModule,
    MatDialogModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class OptionRecipeModule { }
