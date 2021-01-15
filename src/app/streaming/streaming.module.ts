import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StreamingRoutingModule } from './streaming-routing.module';
import { StreamingComponent } from './streaming.component';
import { AngularMaterialModule } from '../Angular_Material/angular_materia.module';
import { FormsModule, NgModel, ReactiveFormsModule } from '@angular/forms';
import { AngularFireStorageModule } from '@angular/fire/storage';


@NgModule({
  declarations: [StreamingComponent, ],
  imports: [
    CommonModule,
    StreamingRoutingModule,
    AngularMaterialModule,
    AngularFireStorageModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class StreamingModule { }
 