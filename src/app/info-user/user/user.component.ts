import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { FollowService } from 'src/app/auth/services/follow.service';
import { ChatService } from 'src/app/chat/service/chat.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  principalPhoto: any;
  displayName: any;
  stateName: any;
  levelName: any;
  totalFollowers: number;
  totalFollowing: number;
  totalRecipes: number;

  constructor(private firestore: AngularFirestore, private router: Router, private auth: AuthService, private follow: FollowService, private chat: ChatService) { }

  ngOnInit(): void {
    this.auth.getUser(this.router.url.slice(9)).subscribe(user => {
      if (user[0]) {
        const userVar: any = user[0];
        this.principalPhoto = userVar.photoUrl;
        this.displayName = userVar.displayName;
        this.firestore.collection("state", ref => ref.where("uid", "==", userVar.uidState)).valueChanges().subscribe(state => {
          if (state[0]) {
            const stateVar: any = state[0]
            this.stateName = stateVar.stateName;
          }
        });

        this.firestore.collection("level", ref => ref.where("uid", "==", userVar.uidLevel)).valueChanges().subscribe(level => {
          if (level[0]) {
            const levelVar: any = level[0];
            this.levelName = levelVar.levelName;
          }
        });

        this.recipes();
        this.followersandFollowings();
      }
    });


  }
  followersandFollowings() {
    this.follow.getFollowers(this.router.url.slice(9)).subscribe(follower => {
      this.totalFollowers = follower.length;
    });
    this.follow.getFollowing(this.router.url.slice(9)).subscribe(following => {
      this.totalFollowing = following.length;;
    });
  }

  recipes() {
    this.firestore.collection("recipe", ref => ref.where("uidUser", "==", this.router.url.slice(9))).valueChanges().
      subscribe(recipes => {
        this.totalRecipes = recipes.length;
    })
  }
}
