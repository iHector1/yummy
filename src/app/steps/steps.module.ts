import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StepsRoutingModule } from './steps-routing.module';
import { StepsComponent } from './steps.component';
import { AngularMaterialModule } from '../Angular_Material/angular_materia.module';
import { TechniqueComponent } from './technique/technique.component';
import { YouTubePlayerModule } from "@angular/youtube-player";

@NgModule({
  declarations: [StepsComponent, TechniqueComponent],
  imports: [
    CommonModule,
    StepsRoutingModule,AngularMaterialModule,
    YouTubePlayerModule
  ]
})
export class StepsModule { }
