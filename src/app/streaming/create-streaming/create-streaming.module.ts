import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateStreamingRoutingModule } from './create-streaming-routing.module';
import { CreateStreamingComponent } from './create-streaming.component';
import { AngularMaterialModule } from 'src/app/Angular_Material/angular_materia.module';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { NgxMatDatetimePickerModule, NgxMatNativeDateModule, NgxMatTimepickerModule } from '@angular-material-components/datetime-picker';


@NgModule({
  declarations: [CreateStreamingComponent],
  imports: [
    CommonModule,
    CreateStreamingRoutingModule,
    AngularMaterialModule,
    AngularFirestoreModule,
    FormsModule,
    ReactiveFormsModule,
    
    MatDatepickerModule,
    MatInputModule,

    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    NgxMatNativeDateModule
  ]
})
export class CreateStreamingModule { }
