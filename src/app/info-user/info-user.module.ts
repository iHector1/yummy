import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InfoUserRoutingModule } from './info-user-routing.module';
import { InfoUserComponent } from './info-user.component';
import { UserComponent } from './user/user.component';
import { RecipesComponent } from './recipes/recipes.component';
import { AngularMaterialModule } from '../Angular_Material/angular_materia.module';


@NgModule({
  declarations: [InfoUserComponent, UserComponent, RecipesComponent],
  imports: [
    CommonModule,
    InfoUserRoutingModule,
    AngularMaterialModule
  ]
})
export class InfoUserModule { }
