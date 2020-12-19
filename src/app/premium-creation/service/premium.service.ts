import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { adPremium } from 'src/app/shared/models/adPremium.interface';

@Injectable({
  providedIn: 'root'
})
export class PremiumService {

  constructor(private afs: AngularFirestore) {
    
  }
  
  createAd(ad:adPremium) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `premiunAd/${ad.uid}`
    );
    return userRef.set(ad, { merge: true });
  }
}
