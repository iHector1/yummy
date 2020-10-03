import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfirguracionRoutingModule } from './confirguracion-routing.module';
import { ConfirguracionComponent } from './confirguracion.component';
import {AngularMaterialModule } from '../../Angular_Material/angular_materia.module';

@NgModule({
  declarations: [ConfirguracionComponent],
  imports: [
    CommonModule,
    ConfirguracionRoutingModule,
    AngularMaterialModule
  ]
})
export class ConfirguracionModule { }
 