import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VistaRecetaRoutingModule } from './vista-receta-routing.module';
import { VistaRecetaComponent } from './vista-receta.component';
import { AngularMaterialModule } from '../../Angular_Material/angular_materia.module';

@NgModule({
  declarations: [VistaRecetaComponent],
  imports: [
    CommonModule,
    VistaRecetaRoutingModule,
    AngularMaterialModule
  ]
})
export class VistaRecetaModule { }
