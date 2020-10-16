import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StreamingRoutingModule } from './streaming-routing.module';
import { StreamingComponent } from './streaming.component';
import { AngularMaterialModule } from '../Angular_Material/angular_materia.module';


@NgModule({
  declarations: [StreamingComponent],
  imports: [
    CommonModule,
    StreamingRoutingModule,
    AngularMaterialModule
  ]
})
export class StreamingModule { }
