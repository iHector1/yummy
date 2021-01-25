import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OptionHelpComponent } from './option-help.component';

const routes: Routes = [{ path: '', component: OptionHelpComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OptionHelpRoutingModule { }
