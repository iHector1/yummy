import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/services/auth.service';
import { User } from '../models/user.inteface';
import { Router } from '@angular/router';
@Component({
  selector: 'app-navbar2',
  templateUrl: './navbar2.component.html',
  styleUrls: ['./navbar2.component.css'],
  providers:[AuthService]
})
export class Navbar2Component {
  public user$: Observable<User> = this.authSvc.afAuth.user;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver,public authSvc: AuthService, private router: Router) {}

  async logout() {
    try {
      await this.authSvc.logout();
    } catch (error) {
      console.log(error);
    }
  }
}
