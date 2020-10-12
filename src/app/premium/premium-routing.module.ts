import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PremiumComponent } from './premium.component';

const routes: Routes = [{ path: '', component: PremiumComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PremiumRoutingModule { }
