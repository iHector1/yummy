import {Component  } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Router } from '@angular/router';
import { User } from '../models/user.inteface';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  providers:[AuthService],
})
export class NavbarComponent {
  public user$: Observable<User> = this.authSvc.afAuth.user;

  constructor(public authSvc: AuthService, private router: Router) { }
 

  async logout() {
    try {
      await this.authSvc.logout();
    } catch (error) {
      console.log(error);
    }
  }
}
