import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlanRecipeComponent } from './plan-recipe.component';

const routes: Routes = [{ path: '', component: PlanRecipeComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlanRecipeRoutingModule { }
