import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CrearRecetasComponent } from './crear-recetas.component';

const routes: Routes = [{ path: '', component: CrearRecetasComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CrearRecetasRoutingModule { }
