import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfirguracionRoutingModule } from './confirguracion-routing.module';
import { ConfirguracionComponent } from './confirguracion.component';


@NgModule({
  declarations: [ConfirguracionComponent],
  imports: [
    CommonModule,
    ConfirguracionRoutingModule
  ]
})
export class ConfirguracionModule { }
