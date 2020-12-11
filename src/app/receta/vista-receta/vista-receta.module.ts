import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VistaRecetaRoutingModule } from './vista-receta-routing.module';
import { VistaRecetaComponent } from './vista-receta.component';
import { AngularMaterialModule } from '../../Angular_Material/angular_materia.module';
import { ComentComponent } from './coment/coment.component';
import { ShareButtonsModule } from 'ngx-sharebuttons/buttons';
import { ShareIconsModule } from 'ngx-sharebuttons/icons';
import { VistaComentariosComponent } from './vista-comentarios/vista-comentarios.component';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { VistaHelpsComponent } from './vista-comentarios/vista-helps/vista-helps.component';
@NgModule({
  declarations: [VistaRecetaComponent, ComentComponent, VistaComentariosComponent, VistaHelpsComponent],
  imports: [
    CommonModule,
    VistaRecetaRoutingModule,
    AngularMaterialModule, 
    ShareButtonsModule.withConfig({
      debug: true
    }),
    ShareIconsModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class VistaRecetaModule { }
  