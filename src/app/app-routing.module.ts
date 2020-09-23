import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SendEmailComponent } from './auth/send-email/send-email.component';
import { CanConfigGuard } from './guards/canConfiguring/can-config.guard';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  { path: 'login', loadChildren: () => import('./auth/login/login.module').then(m => m.LoginModule) },
  { path: 'registro', loadChildren: () => import('./auth/registro/registro.module').then(m => m.RegistroModule) },
  {
    path: "verificacion",
    component:SendEmailComponent
  },
  { path: 'olvido-contraseña', loadChildren: () => import('./auth/forgot-password/forgot-password.module').then(m => m.ForgotPasswordModule) },
  {
    path: 'configuracion', loadChildren: () => import('./auth/confirguracion/confirguracion.module').then(m => m.ConfirguracionModule)//canActivate:[CanConfigGuard]
  },
  { path: 'receta/id', loadChildren: () => import('./receta/vista-receta/vista-receta.module').then(m => m.VistaRecetaModule) },
  { path: 'crear-receta', loadChildren: () => import('./receta/crear-recetas/crear-recetas.module').then(m => m.CrearRecetasModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
