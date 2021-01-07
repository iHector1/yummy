import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { infoUser } from 'src/app/shared/models/infoUser.interface';

@Injectable({
  providedIn: 'root'
})
export class StepsService {
  bander: boolean = true;
  constructor(private afs: AngularFirestore) { 
    this.bander = true;
  } 
  
  pointsUser(uidUser, points) {
    this.bander = true;
    this.afs.collection('infoUser', ref => ref.where('uid', '==', uidUser)).valueChanges().subscribe(user => {
      if (user[0]) {
        const infoUser: infoUser = user[0]; 
        this.insertPoints(infoUser.uid,points,infoUser.points,infoUser.uidLevel);
      }
    })
  }

  private insertPoints(uidUser, pointsAdd, pointsUser,uidLevel) {

    if (this.bander == true) {
      const totalPoints = pointsAdd + pointsUser;
     // console.log(pointsAdd, pointsUser);
      window.alert(`Tienes ${totalPoints} puntos`);
      this.afs.collection('infoUser').doc(uidUser).set({ points: totalPoints }, { merge: true });
      if (totalPoints >= 2200 && totalPoints < 3200 &&uidLevel!='NmKowqg5p15ZuQBxPVLB') {
        this.afs.collection('infoUser').doc(uidUser).set({ uidLevel: 'NmKowqg5p15ZuQBxPVLB' }, { merge: true });
        window.alert('Eres nivel Intermedio!');
      }
      if (totalPoints >= 3200 && uidLevel!='XPskrj6Ci3m6dgVKfpN3') {
        this.afs.collection('infoUser').doc(uidUser).set({ uidLevel: 'XPskrj6Ci3m6dgVKfpN3' }, { merge: true });
        window.alert('Eres nivel Avanzado!');
      }
      this.bander = false;
    }
  }
}
