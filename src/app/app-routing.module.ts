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
    path: 'configuracion', loadChildren: () => import('./auth/confirguracion/confirguracion.module').then(m => m.ConfirguracionModule),canActivate:[CanConfigGuard]
  },
  { path: 'receta/id', loadChildren: () => import('./receta/vista-receta/vista-receta.module').then(m => m.VistaRecetaModule) },
  { path: 'mi_alacena', loadChildren: () => import('./cupboard/cupboard.module').then(m => m.CupboardModule) },
  { path: 'lista_super', loadChildren: () => import('./super-list/super-list.module').then(m => m.SuperListModule) },
  { path: 'solicitar_ingrediente', loadChildren: () => import('./ingredients/ingredients.module').then(m => m.IngredientsModule) },
  { path: 'solicitar_utensilio', loadChildren: () => import('./cook-ware-request/cook-ware-request.module').then(m => m.CookWareRequestModule) },
  { path: 'buscar_receta', loadChildren: () => import('./search-recipes/search-recipes.module').then(m => m.SearchRecipesModule) },
  { path: 'recetas_guardadas', loadChildren: () => import('./recipe-saved/recipe-saved.module').then(m => m.RecipeSavedModule) },
  { path: 'anuncio_premium', loadChildren: () => import('./premium-creation/premium-creation.module').then(m => m.PremiumCreationModule) },
  { path: 'ver_premium', loadChildren: () => import('./premium/premium.module').then(m => m.PremiumModule) },
  { path: 'perfil_usuario', loadChildren: () => import('./info-user/info-user.module').then(m => m.InfoUserModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
