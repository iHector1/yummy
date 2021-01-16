import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { PopularComponent } from './popular/popular.component';
import { NewestComponent } from './newest/newest.component';
import { MonthComponent } from './month/month.component';
import { AngularMaterialModule } from '../Angular_Material/angular_materia.module';
import { NameUserComponent } from './name-user/name-user.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

@NgModule({
  declarations: [HomeComponent, PopularComponent, NewestComponent, MonthComponent, NameUserComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    AngularMaterialModule,
    MDBBootstrapModule.forRoot()
  ]
})
export class HomeModule { }
