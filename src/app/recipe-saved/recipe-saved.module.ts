import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecipeSavedRoutingModule } from './recipe-saved-routing.module';
import { RecipeSavedComponent } from './recipe-saved.component';
import { AngularMaterialModule } from '../Angular_Material/angular_materia.module';


@NgModule({
  declarations: [RecipeSavedComponent],
  imports: [
    CommonModule,
    RecipeSavedRoutingModule,
    AngularMaterialModule
  ]
})
export class RecipeSavedModule { }
