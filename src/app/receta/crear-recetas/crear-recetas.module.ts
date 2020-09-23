import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CrearRecetasRoutingModule } from './crear-recetas-routing.module';
import { CrearRecetasComponent } from './crear-recetas.component';
import { AngularMaterialModule } from '../../Angular_Material/angular_materia.module';

@NgModule({
  declarations: [CrearRecetasComponent],
  imports: [
    CommonModule,
    CrearRecetasRoutingModule,
    AngularMaterialModule
  ]
})
export class CrearRecetasModule { }
