import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CupboardComponent } from './cupboard.component';

const routes: Routes = [{ path: '', component: CupboardComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CupboardRoutingModule { }
