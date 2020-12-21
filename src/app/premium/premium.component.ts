import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-premium',
  templateUrl: './premium.component.html',
  styleUrls: ['./premium.component.css']
})
export class PremiumComponent implements OnInit {
  message: any;
  cost: any;
  paypalAccount: any;
  urlVideo: any;
  displayName: any;

  constructor(private router: Router, private afs:AngularFirestore) {
    console.log(this.router.url.slice(13));
    this.afs.collection('premiunAd', ref => ref.where("uid", '==', this.router.url.slice(13))).valueChanges().subscribe(ad => {
      if (ad[0]) {
        const adVar:any = ad[0];
        this.message = adVar.message;
        this.cost = adVar.cost;
        this.paypalAccount = adVar.paypalAccount;
        this.urlVideo = adVar.urlVideo;
        console.log(this.urlVideo);
        this.afs.collection('infoUser', ref => ref.where("uid", "==", adVar.uid)).valueChanges().subscribe(user => {
          if (user[0]) {
            const infoUser: any = user[0];
            this.displayName = infoUser.displayName;       
         }
       })
     } 
    })
   }

  ngOnInit(): void {
  }

}
