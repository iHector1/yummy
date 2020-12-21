import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/services/auth.service';
import { User } from '../shared/models/user.inteface';
declare var paypal;
@Component({
  selector: 'app-premium',
  templateUrl: './premium.component.html',
  styleUrls: ['./premium.component.css']
})
export class PremiumComponent implements OnInit {
  @ViewChild('paypal', { static: true }) paypalElement: ElementRef;
  message: any;
  cost: number=12;
  paypalAccount: any;
  urlVideo: any;
  displayName: any;
  showApropied: boolean;
  showLogin: boolean;
  paypalButtons: boolean;

  constructor(private router: Router, private afs:AngularFirestore,private auth:AuthService) {
    console.log(this.router.url.slice(13));
    this.afs.collection('premiunAd', ref => ref.where("uid", '==', this.router.url.slice(13))).valueChanges().subscribe(ad => {
      if (ad[0]) {
        const adVar: any = ad[0];
        this.message = adVar.message;
        //this.cost = adVar.cost;
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
    });
    this.user$.subscribe(user => {
      console.log(user.uid);
      if (user.uid==this.router.url.slice(13)) {
        this.paypalButtons = false;
      } if (user.uid == undefined || user.uid=="" || user.uid==null) {
         this.paypalButtons = false;
       }
      else {
        this.paypalButtons = true;
       }
     });
   }
   public user$: Observable<User> = this.auth.afAuth.user;

  ngOnInit(): void {
    paypal.Buttons({
      createOrder: (data, actions) => {
        return actions.order.create({
          purchase_units: [
            {
              description: this.message,
              amount     :{
                currency_code: 'MXN',
                value        : this.cost
              }
            }
          ]
        })
      },
      onApprove: async (data, actions) => {
        const order = await actions.order.capture();
        console.log(order);
        
      },
      onError: err =>{
        console.log(err);
        
      },
      style: {
        layout:  'horizontal',
        label: 'buynow',
      }
    }
      
    ).render( this.paypalElement.nativeElement);
  }

}
