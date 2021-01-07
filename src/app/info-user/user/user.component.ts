import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { FollowService } from 'src/app/auth/services/follow.service';
import { ChatService } from 'src/app/chat/service/chat.service';
import { User } from 'src/app/shared/models/user.inteface';

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
  isFollowing: any;
  isUser: any;
  show: boolean;
  isUserName: any;
  premium: boolean;
  useruid: any;
  colorButton: string;

  public user$: Observable<User> = this.auth.afAuth.user;
  constructor(private firestore: AngularFirestore, private router: Router, private auth: AuthService, private follow: FollowService, private chat: ChatService) { }

  ngOnInit(): void {
    this.useruid = this.router.url.slice(9);
    this.isFollowing = false;
    this.premium = false;
    this.auth.getUser(this.useruid).subscribe(user => {
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
        this.firestore.collection("premiunCreator", ref => ref.where('uid', '==', userVar)).valueChanges().subscribe(premium => {
          if (premium[0]) {
            this.premium = true;
          }
        });
        this.firestore.collection("level", ref => ref.where("uid", "==", userVar.uidLevel)).valueChanges().subscribe(level => {
          if (level[0]) {
            const levelVar: any = level[0];
            this.levelName = levelVar.levelName;
          }
        });
        this.user(this.useruid);
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
    this.firestore.collection("infoRecipe", ref => ref.where("uidUser", "==", this.router.url.slice(9))).valueChanges().
      subscribe(recipes => {
        this.totalRecipes = recipes.length;
    })
  }
  followUser() {
    if (this.isFollowing) {
      this.isFollowing = false;
      this.follow.unfollow(this.useruid);
    } else {
      this.isFollowing = true;
      this.follow.follow(this.useruid);
      this.chat.createChat(this.useruid,this.isUser,this.displayName,this.isUserName)
    }
  }
  user(uid) {
    this.auth.getUser(uid).subscribe(user => {
      if (user[0]) {
        const uiUser: any = user[0];
        this.displayName = uiUser.displayName;
        this.user$.subscribe(user => {
          this.isUser = user.uid;
          if (this.isUser == uiUser.uid || this.isUser == null || this.isUser == undefined || this.isUser == "") {
            this.show = false;
           
          }
          else {
            this.show = true;
            this.follow.isFollowing(uid, this.isUser).subscribe(
              followinguser => {
                if (followinguser[0]) {
                  this.isFollowing = true;
               //   console.log("sie entro ");
                }
              });
            
          }
          this.auth.getUser(this.isUser).subscribe(user2 => {
            if (user2[0]) {
              const uiUser2: any = user2[0];
              this.isUserName = uiUser2.displayName;
            }
          })
          // console.log("primero: ", uiUser.uid, "segundo: ", this.isUser);
          // console.log(this.show);
        });
        
      }
      
    });
  }
  checkFollowing() {
    if (this.isFollowing) {
      this.colorButton = "primary";
      return 'Siguiendo';
    } else {
      this.colorButton = "accent";
      return 'Seguir';
    }
  }
}
