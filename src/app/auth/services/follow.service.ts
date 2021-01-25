import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { ChatService } from 'src/app/chat/service/chat.service';
import { NotificationsService } from 'src/app/notifications/service/notifications.service';
import { User } from 'src/app/shared/models/user.inteface';
import { AuthService } from './auth.service';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class FollowService {

  constructor( private afs: AngularFirestore,
    private auth: AuthService,private chatService:ChatService,private noti:NotificationsService) { }

    public user$: Observable<User> = this.auth.afAuth.user;
  
    isFollowing(profileuid, currentuid) {
      return this.afs.collection<any>('follower/' + profileuid + '/users', ref => ref.where('uid', '==', currentuid)).valueChanges();
    }
    getFollowing(uid) {
      return this.afs.collection<any>('following/'+uid+'/users').valueChanges();
    }
  
    getFollowers(uid) {
      return this.afs.collection<any>('follower/'+uid+'/users').valueChanges();
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
              date: new Date(),
            };
            
            this.afs.collection( 'following/'+currentuid+'/users').doc(profileuid).set(data);
           let datas = {
              uid: currentuid,
              uidUser: currentuid ,
             uidFollower: profileuid,
             userPremium: false,
             date: new Date(),
             
            };
            this.afs.collection('follower/' + profileuid + '/users').doc(currentuid).set(datas);
            this.noti.sendEmailFollower(profileuid,currentuid);
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
  followPremium(uidUserAd, uidPremium) {
    this.afs.collection('follower/' + uidUserAd + '/users').doc(uidPremium).set({ userPremium: true,datePremium: new Date() }, { merge: true });
    this.afs.collection('following/'+uidPremium+'/users' ).doc(uidUserAd).set({userPremium:true,datePremium: new Date()},{merge:true});
  }
}
