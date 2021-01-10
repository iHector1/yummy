import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdateRecipeComponent } from './update-recipe.component';

const routes: Routes = [{ path: '', component: UpdateRecipeComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UpdateRecipeRoutingModule { }
