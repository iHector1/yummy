import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VistaRecetaRoutingModule } from './vista-receta-routing.module';
import { VistaRecetaComponent } from './vista-receta.component';
import { AngularMaterialModule } from '../../Angular_Material/angular_materia.module';
import { ComentComponent } from './coment/coment.component';

@NgModule({
  declarations: [VistaRecetaComponent, ComentComponent],
  imports: [
    CommonModule,
    VistaRecetaRoutingModule,
    AngularMaterialModule,

  ]
})
export class VistaRecetaModule { }
