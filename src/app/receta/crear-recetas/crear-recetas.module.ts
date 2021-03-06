import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CrearRecetasRoutingModule } from './crear-recetas-routing.module';
import { CrearRecetasComponent } from './crear-recetas.component';
import { AngularMaterialModule } from '../../Angular_Material/angular_materia.module';
import { Observable } from 'rxjs';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [CrearRecetasComponent],
  imports: [
    CommonModule,
    CrearRecetasRoutingModule,
    AngularMaterialModule,
    AngularFirestoreModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class CrearRecetasModule {}
