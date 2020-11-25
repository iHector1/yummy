import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { User } from 'src/app/shared/models/user.inteface';
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root'
})
export class FollowService {

  constructor( private afs: AngularFirestore,
    private auth: AuthService) { }

    public user$: Observable<User> = this.auth.afAuth.user;
  
    isFollowing(profileuid, currentuid) {
      return this.afs.collection<any>('follower/' + profileuid + '/users', ref => ref.where('uid', '==', currentuid)).valueChanges();
    }
    getFollowing(uid) {
      return this.afs.collection<any>('following/'+uid).valueChanges();
    }
  
    getFollowers(uid) {
      return this.afs.collection<any>('follower/'+uid).valueChanges();
    }
  follow(profileuid) {
      this.user$.subscribe(
        user => {
          if (user) {
            const currentuid = user.uid;
            let data = {
              uid: profileuid,
              uidUser: profileuid,
              uidFollowing: currentuid,
              userPremium: false,
            };
            
            this.afs.collection( 'following/'+currentuid+'/users').doc(profileuid).set(data);
           let datas = {
              uid: currentuid,
              uidUser: currentuid ,
              uidFollower:profileuid
            };
            this.afs.collection('follower/'+profileuid+'/users' ).doc(currentuid).set(datas);
          }
        });
    }
    unfollow(profileuid) {
      this.user$.subscribe(
        user => {
          if (user) {
            const currentuid = user.uid;
            this.afs.collection<any>( 'following/'+currentuid+'/users').doc(profileuid).delete();
            this.afs.collection<any>('follower/'+ profileuid+'/users' ).doc(currentuid).delete();
          }
      });
    }
}
