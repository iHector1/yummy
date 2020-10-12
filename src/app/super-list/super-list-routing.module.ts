import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SuperListComponent } from './super-list.component';

const routes: Routes = [{ path: '', component: SuperListComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuperListRoutingModule { }
