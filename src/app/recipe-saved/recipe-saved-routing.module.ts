import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecipeSavedComponent } from './recipe-saved.component';

const routes: Routes = [{ path: '', component: RecipeSavedComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecipeSavedRoutingModule { }
