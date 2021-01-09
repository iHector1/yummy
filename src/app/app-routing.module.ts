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
    path: 'configuracion', loadChildren: () => import('./auth/confirguracion/confirguracion.module').then(m => m.ConfirguracionModule)
  },
  { path: 'receta/:id', loadChildren: () => import('./receta/vista-receta/vista-receta.module').then(m => m.VistaRecetaModule) },
  { path: 'mi_alacena/:uidUser', loadChildren: () => import('./cupboard/cupboard.module').then(m => m.CupboardModule) },
  { path: 'lista_super/:uidUser', loadChildren: () => import('./super-list/super-list.module').then(m => m.SuperListModule) },
  { path: 'solicitar_ingrediente', loadChildren: () => import('./ingredients/ingredients.module').then(m => m.IngredientsModule) },
  { path: 'solicitar_utensilio', loadChildren: () => import('./cook-ware-request/cook-ware-request.module').then(m => m.CookWareRequestModule) },
  { path: 'buscar_receta', loadChildren: () => import('./search-recipes/search-recipes.module').then(m => m.SearchRecipesModule) },
  { path: 'recetas_guardadas', loadChildren: () => import('./recipe-saved/recipe-saved.module').then(m => m.RecipeSavedModule) },
  { path: 'anuncio_premium', loadChildren: () => import('./premium-creation/premium-creation.module').then(m => m.PremiumCreationModule) },
  { path: 'ver_premium/:id', loadChildren: () => import('./premium/premium.module').then(m => m.PremiumModule) },
  { path: 'usuario/:id', loadChildren: () => import('./info-user/info-user.module').then(m => m.InfoUserModule) },
  { path: 'crear-receta', loadChildren: () => import('./receta/crear-recetas/crear-recetas.module').then(m => m.CrearRecetasModule) },
  { path: 'notificaciones/:id', loadChildren: () => import('./notifications/notifications.module').then(m => m.NotificationsModule) },
  { path: 'chat', loadChildren: () => import('./chat/chat.module').then(m => m.ChatModule) },
  { path: 'chat/:uidRoom', loadChildren: () => import('./chat/chat.module').then(m => m.ChatModule) },
  { path: 'pasos/:id', loadChildren: () => import('./steps/steps.module').then(m => m.StepsModule) },
  { path: 'graficas', loadChildren: () => import('./graphics/graphics.module').then(m => m.GraphicsModule) },
  { path: 'streaming', loadChildren: () => import('./streaming/streaming.module').then(m => m.StreamingModule) },
  { path: 'crear-streaming', loadChildren: () => import('./streaming/create-streaming/create-streaming.module').then(m => m.CreateStreamingModule) },
  { path: 'recetas_planeadas/:id', loadChildren: () => import('./planned-recipes/planned-recipes.module').then(m => m.PlannedRecipesModule) },
  { path: 'planear_receta', loadChildren: () => import('./plan-recipe/plan-recipe.module').then(m => m.PlanRecipeModule) },
  { path: 'opciones', loadChildren: () => import('./option-recipe/option-recipe.module').then(m => m.OptionRecipeModule) },
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
