import {Component, OnInit  } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  providers:[AuthService],
})
export class NavbarComponent implements OnInit{
  public isLogged = false;
  public user: any;
  public user$: Observable<any> = this.authSvc.afAuth.user;
  //efecto del navbar
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );  

  constructor(private breakpointObserver: BreakpointObserver, private authSvc: AuthService,private router:Router) { }
 
  async ngOnInit() {
    this.user = await this.authSvc.getCurrentUser();
    if (this.user) {
      this.isLogged = true;
    }
  }

  async logout() {
    try {
    await   this.authSvc.logout();
    this.router.navigate(["/login"]);
    }
    catch (err) {
      console.log(err);
    }
  }
}
