import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewstreamingRoutingModule } from './viewstreaming-routing.module';
import { ViewstreamingComponent } from './viewstreaming.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from 'src/app/Angular_Material/angular_materia.module';


@NgModule({
  declarations: [ViewstreamingComponent],
  imports: [
    CommonModule,
    ViewstreamingRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularMaterialModule
  ]
})
export class ViewstreamingModule { }
