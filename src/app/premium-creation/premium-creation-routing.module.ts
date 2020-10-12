import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PremiumCreationComponent } from './premium-creation.component';

const routes: Routes = [{ path: '', component: PremiumCreationComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PremiumCreationRoutingModule { }
