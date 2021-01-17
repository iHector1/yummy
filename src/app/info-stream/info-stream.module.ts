import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InfoStreamRoutingModule } from './info-stream-routing.module';
import { InfoStreamComponent } from './info-stream.component';
import { AngularMaterialModule } from '../Angular_Material/angular_materia.module';
import { MatDialogModule } from '@angular/material/dialog';


@NgModule({
  declarations: [InfoStreamComponent],
  imports: [
    CommonModule,
    InfoStreamRoutingModule,
    AngularMaterialModule,
    MatDialogModule
  ]
})
export class InfoStreamModule { }
