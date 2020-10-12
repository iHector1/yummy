import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ScheduleRecipesRoutingModule } from './schedule-recipes-routing.module';
import { ScheduleRecipesComponent } from './schedule-recipes.component';
import { AngularMaterialModule } from 'src/app/Angular_Material/angular_materia.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ScheduleRecipesComponent],
  imports: [
    CommonModule,
    ScheduleRecipesRoutingModule,
    AngularMaterialModule, ReactiveFormsModule,
    FormsModule
  ]
})
export class ScheduleRecipesModule { }
