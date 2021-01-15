import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewstreamingComponent } from './viewstreaming.component';

const routes: Routes = [{ path: '', component: ViewstreamingComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewstreamingRoutingModule { }
