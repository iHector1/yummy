import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CookWareRequestComponent } from './cook-ware-request.component';

const routes: Routes = [{ path: '', component: CookWareRequestComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CookWareRequestRoutingModule { }
