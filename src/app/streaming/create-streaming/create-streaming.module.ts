import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateStreamingRoutingModule } from './create-streaming-routing.module';
import { CreateStreamingComponent } from './create-streaming.component';


@NgModule({
  declarations: [CreateStreamingComponent],
  imports: [
    CommonModule,
    CreateStreamingRoutingModule
  ]
})
export class CreateStreamingModule { }
