import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateStreamingComponent } from './create-streaming.component';

const routes: Routes = [{ path: '', component: CreateStreamingComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreateStreamingRoutingModule { }
