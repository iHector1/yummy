import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/services/auth.service';
import { User } from '../models/user.inteface';
import { Router } from '@angular/router';
import { FollowService } from 'src/app/auth/services/follow.service';
@Component({
  selector: 'app-navbar2',
  templateUrl: './navbar2.component.html',
  styleUrls: ['./navbar2.component.css'],
  providers:[AuthService]
})
export class Navbar2Component implements OnInit {
  public user$: Observable<User> = this.authSvc.afAuth.user;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
  hide: boolean;

  constructor(private breakpointObserver: BreakpointObserver, public authSvc: AuthService, private router: Router, private follow: FollowService) {
     
  }
  ngOnInit(): void {
    this.user$.subscribe(user => {
      this.follow.getFollowers(user.uid).subscribe(follower => {
        if (follower.length > 2) {
          this.hide = true;
        }
        else {
          this.hide = false;
        }
      });
    });
  }
  async logout() {
    try {
      await this.authSvc.logout();
    } catch (error) {
      console.log(error);
    }
  }
}
