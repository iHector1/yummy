import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/services/auth.service';
import { User } from '../models/user.inteface';
import { Router } from '@angular/router';
import { FollowService } from 'src/app/auth/services/follow.service';
import { AngularFirestore } from '@angular/fire/firestore';
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
  totalRecipes: number;

  constructor(private breakpointObserver: BreakpointObserver, public authSvc: AuthService, private router: Router, private follow: FollowService,private afs:AngularFirestore) {
     
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
        console.log(this.hide);
      });
      this.afs.collection("infoRecipe", ref => ref.where("uidUser", "==", user.uid)).valueChanges().
      subscribe(recipes => {
        this.totalRecipes = recipes.length;
        if (this.totalRecipes>49) {
          this.hide = true;
        } else {
          this.hide = false;
        }
        console.log(this.hide);
    })
    });
  }
  async logout() {
    try {
      await this.authSvc.logout();
    } catch (error) {
    //  console.log(error);
    }
  }
}
