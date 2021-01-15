import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AllstreamingRoutingModule } from './allstreaming-routing.module';
import { AllstreamingComponent } from './allstreaming.component';
import { AngularMaterialModule } from 'src/app/Angular_Material/angular_materia.module';
import { UsernameComponent } from './username/username.component';



@NgModule({
  declarations: [AllstreamingComponent, UsernameComponent,],
  imports: [
    CommonModule,
    AllstreamingRoutingModule,
    AngularMaterialModule,
    
  ]
})
export class AllstreamingModule { }
