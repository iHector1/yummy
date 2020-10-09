import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SendEmailComponent } from './auth/send-email/send-email.component';
import { CanConfigGuard } from './guards/canConfiguring/can-config.guard';
import { PageNotFoundComponent} from './page-not-found/page-not-found.component';

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
  { path: 'notificaciones/id', loadChildren: () => import('./notifications/notifications.module').then(m => m.NotificationsModule) },
  { path: 'chat', loadChildren: () => import('./chat/chat.module').then(m => m.ChatModule) },
  { path: 'pasos/:id', loadChildren: () => import('./steps/steps.module').then(m => m.StepsModule) },
  { path: 'recetas-programadas', loadChildren: () => import('./receta/schedule-recipes/schedule-recipes.module').then(m => m.ScheduleRecipesModule) },
  {
    path: '**',
    component:PageNotFoundComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
