import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VistaRecetaRoutingModule } from './vista-receta-routing.module';
import { VistaRecetaComponent } from './vista-receta.component';


@NgModule({
  declarations: [VistaRecetaComponent],
  imports: [
    CommonModule,
    VistaRecetaRoutingModule
  ]
})
export class VistaRecetaModule { }
