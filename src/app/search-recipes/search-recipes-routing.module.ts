import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchRecipesComponent } from './search-recipes.component';

const routes: Routes = [{ path: '', component: SearchRecipesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SearchRecipesRoutingModule { }
