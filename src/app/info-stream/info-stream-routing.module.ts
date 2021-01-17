import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InfoStreamComponent } from './info-stream.component';

const routes: Routes = [{ path: '', component: InfoStreamComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InfoStreamRoutingModule { }
