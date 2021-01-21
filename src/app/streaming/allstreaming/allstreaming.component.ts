import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { FollowService } from 'src/app/auth/services/follow.service';
import { User } from 'src/app/shared/models/user.inteface';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { InfoStreamComponent } from 'src/app/info-stream/info-stream.component';
@Component({
  selector: 'app-allstreaming',
  templateUrl: './allstreaming.component.html',
  styleUrls: ['./allstreaming.component.css']
})
export class AllstreamingComponent implements OnInit {

  public user$: Observable<User> = this.auth.afAuth.user;
  userPremium: boolean=false;
  myStreams: any[]=[];
  otherStream: any[] = [];
  constructor(private afs: AngularFirestore, private auth: AuthService, private router: Router,private follow:FollowService,public dialog: MatDialog) {
    var dates = new Date();
    var Now = dates.getDate();
      this.afs.collection('premiunCreator', ref => ref.where('uid', '==', this.router.url.slice(17))).valueChanges().subscribe(premium => {
        if (premium[0]) {
          this.userPremium = true;
         
        }
      });
    this.afs.collection('stream', ref => ref.where('uidUser', '==', this.router.url.slice(17))).valueChanges().subscribe(stream => {
      stream.forEach((x) => {
        var time = x['date'];
        var timeSeconds = time.seconds * 1000;
        var date = new Date(timeSeconds);
        var day = date.getDate();
        if (day==Now) {
          this.myStreams.push(x);
        }
        })
      });
      this.follow.getFollowing(this.router.url.slice(17)).subscribe(user=>{
        user.forEach((x) => {
          if (x.userPremium == true) {
            this.getOtherStrems(x.uid);
          }
        }) 
      })
   }
  private getOtherStrems(uid) {
    var dates = new Date();
    var Now = dates.getDate();
    this.afs.collection('stream', ref => ref.where('uidUser', '==', uid)).valueChanges().subscribe(stream => {
      stream.forEach((x) => {
        var time = x['date'];
        var timeSeconds = time.seconds * 1000;
        var date = new Date(timeSeconds);
        var day = date.getDate();
        if (day==Now) {
          this.otherStream.push(x);
        }
        })
      }); 
   }
  ngOnInit(): void {
  }
  openDialog(uid): void {
    const dialogRef = this.dialog.open(InfoStreamComponent, {
      data: uid,
    });
  }
}
