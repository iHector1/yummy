import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GraphicsRoutingModule } from './graphics-routing.module';
import { GraphicsComponent } from './graphics.component';
import { FollowersComponent } from './followers/followers.component';
import { StarsComponent } from './stars/stars.component';
import { AngularMaterialModule } from '../Angular_Material/angular_materia.module';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [GraphicsComponent, FollowersComponent, StarsComponent],
  imports: [
    CommonModule,
    GraphicsRoutingModule,
    AngularMaterialModule,
    ChartsModule 
  ]
})
export class GraphicsModule { }
