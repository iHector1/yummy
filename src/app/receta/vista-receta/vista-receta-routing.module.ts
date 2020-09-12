import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VistaRecetaComponent } from './vista-receta.component';

const routes: Routes = [{ path: '', component: VistaRecetaComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VistaRecetaRoutingModule {  }
