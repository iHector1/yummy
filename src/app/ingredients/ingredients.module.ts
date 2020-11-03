import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IngredientsRoutingModule } from './ingredients-routing.module';
import { IngredientsComponent } from './ingredients.component';
import { AngularMaterialModule } from '../Angular_Material/angular_materia.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFirestoreModule } from '@angular/fire/firestore';


@NgModule({
  declarations: [IngredientsComponent],
  imports: [
    CommonModule,
    IngredientsRoutingModule,
    AngularMaterialModule,
    AngularFirestoreModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class IngredientsModule { }
