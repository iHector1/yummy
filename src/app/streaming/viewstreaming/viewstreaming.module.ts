import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewstreamingRoutingModule } from './viewstreaming-routing.module';
import { ViewstreamingComponent } from './viewstreaming.component';


@NgModule({
  declarations: [ViewstreamingComponent],
  imports: [
    CommonModule,
    ViewstreamingRoutingModule
  ]
})
export class ViewstreamingModule { }
