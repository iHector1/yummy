import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OptionHelpRoutingModule } from './option-help-routing.module';
import { OptionHelpComponent } from './option-help.component';


@NgModule({
  declarations: [OptionHelpComponent],
  imports: [
    CommonModule,
    OptionHelpRoutingModule
  ]
})
export class OptionHelpModule { }
