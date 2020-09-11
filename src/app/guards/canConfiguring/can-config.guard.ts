import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CanConfigGuard implements CanActivate {
  constructor(private authSvc:AuthService){}
  canActivate(): Observable<boolean> | Promise<boolean>  | boolean  {
    return this.authSvc.user$.pipe(
      take(1),
      map((user) => user && this.authSvc.isUser(user)),
      tap(CanConfigGuard => {
        if (!CanConfigGuard) {
          window.alert("Inicia Sesion para ingresar a esta pagina")
        }
      })
    );
  }
  
}
