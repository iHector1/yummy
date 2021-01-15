import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { User } from 'src/app/shared/models/user.inteface';

@Component({
  selector: 'app-allstreaming',
  templateUrl: './allstreaming.component.html',
  styleUrls: ['./allstreaming.component.css']
})
export class AllstreamingComponent implements OnInit {

  public user$: Observable<User> = this.auth.afAuth.user;
  userPremium: boolean=false;
  myStreams: Observable<unknown[]>;
  date = new Date();
  constructor(private afs: AngularFirestore, private auth: AuthService) {
    this.user$.subscribe(user => {
      this.afs.collection('premiunCreator', ref => ref.where('uid', '==', user.uid)).valueChanges().subscribe(premium => {
        if (premium[0]) {
          this.userPremium = true;
          this.myStreams = this.afs.collection('stream', ref => ref.where('uidUser', '==', user.uid)).valueChanges();
        }
      });
      
    });

    
    
   }

  ngOnInit(): void {
  }

}
