import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OptionCommentRoutingModule } from './option-comment-routing.module';
import { OptionCommentComponent } from './option-comment.component';
import { AngularMaterialModule } from '../Angular_Material/angular_materia.module';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [OptionCommentComponent],
  imports: [
    CommonModule,
    OptionCommentRoutingModule,
    AngularMaterialModule,
    MatDialogModule,
    ReactiveFormsModule,
    FormsModule
  ] 
})
export class OptionCommentModule { }
