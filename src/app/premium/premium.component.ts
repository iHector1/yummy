import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/services/auth.service';
import { FollowService } from '../auth/services/follow.service';
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
  cost: number;
  paypalAccount: any;
  urlVideo: any;
  displayName: any;
  showApropied: boolean;
  showLogin: boolean;
  paypalButtons: boolean=true;
  userPremium: string;

  constructor(private router: Router, private afs:AngularFirestore,private auth:AuthService,private follow:FollowService) {
   // console.log(this.router.url.slice(13));
    this.afs.collection('premiunAd', ref => ref.where("uid", '==', this.router.url.slice(13))).valueChanges().subscribe(ad => {
      if (ad[0]) {
        const adVar: any = ad[0];
        this.message = adVar.message;
        this.cost = adVar.cost;
        this.paypalAccount = adVar.paypalAccount;
        this.urlVideo = adVar.urlVideo;
       // console.log(this.urlVideo);
        this.afs.collection('infoUser', ref => ref.where("uid", "==", adVar.uid)).valueChanges().subscribe(user => {
          if (user[0]) {
            const infoUser: any = user[0];
            this.displayName = infoUser.displayName;
          }
        })
      }
    });
    this.user$.subscribe(user => {
      this.userPremium = user.uid;
      if (user.uid==this.router.url.slice(13)) {
        this.paypalButtons = true;
      }else if (user.uid == undefined || user.uid=="" || user.uid==null) {
         this.paypalButtons = true;
       }
      else {
       // console.log("sientro pero no sirvo")
        this.paypalButtons = false;
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
        this.follow.followPremium(this.router.url.slice(13), this.userPremium);
        window.alert("Gracias por suscribirte!");
        this.router.navigate(['/home']);
      },
      onError: err =>{
       // console.log(err);
        
      },
      style: {
        layout:  'horizontal',
        label: 'buynow',
      }
    }
      
    ).render( this.paypalElement.nativeElement);
  }

}
