import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OptionRecipeComponent } from './option-recipe.component';

const routes: Routes = [{ path: '', component: OptionRecipeComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OptionRecipeRoutingModule { }
