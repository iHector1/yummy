import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ScheduleRecipesComponent } from './schedule-recipes.component';

const routes: Routes = [{ path: '', component: ScheduleRecipesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ScheduleRecipesRoutingModule { }
