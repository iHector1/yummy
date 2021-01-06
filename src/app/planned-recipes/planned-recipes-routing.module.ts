import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlannedRecipesComponent } from './planned-recipes.component';

const routes: Routes = [{ path: '', component: PlannedRecipesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlannedRecipesRoutingModule { }
