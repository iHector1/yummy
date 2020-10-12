import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CookWareRequestRoutingModule } from './cook-ware-request-routing.module';
import { CookWareRequestComponent } from './cook-ware-request.component';
import { AngularMaterialModule } from '../Angular_Material/angular_materia.module';


@NgModule({
  declarations: [CookWareRequestComponent],
  imports: [
    CommonModule,
    CookWareRequestRoutingModule,
    AngularMaterialModule
  ]
})
export class CookWareRequestModule { }
