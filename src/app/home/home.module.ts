import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { PopularComponent } from './popular/popular.component';
import { NewestComponent } from './newest/newest.component';
import { MonthComponent } from './month/month.component';
import { AngularMaterialModule } from '../Angular_Material/angular_materia.module';


@NgModule({
  declarations: [HomeComponent, PopularComponent, NewestComponent, MonthComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    AngularMaterialModule
  ]
})
export class HomeModule { }
