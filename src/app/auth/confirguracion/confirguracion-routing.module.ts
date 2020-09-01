import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConfirguracionComponent } from './confirguracion.component';

const routes: Routes = [{ path: '', component: ConfirguracionComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfirguracionRoutingModule { }
