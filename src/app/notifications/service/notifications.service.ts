import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';

@Injectable({   
  providedIn: 'root'
})
export class NotificationsService {

  constructor(private afs: AngularFirestore) { }

  sendEmailFollower(uidProfile) { 
    this.afs.collection('users', ref => ref.where('uid', '==', uidProfile)).valueChanges().subscribe(user1 => {
      if (user1[0]) {
        const user: any = user1[0];
        const email1 = user.email;
        this.afs.collection('mail').add({
            uidUser:user.uid,
            to: email1,
            message: {
              subject: 'Nuevo Seguidor',
              html:'Tienes un nuevo seguidor !!!!'
            }
          })
      }
    })
  }

  sendEmailComment(uidRecipe) {
    console.log('si envio 1');
    let use1 = true;
    this.afs.collection('infoRecipe', ref => ref.where('uid', '==', uidRecipe)).valueChanges().subscribe(recipe => {
      if (recipe[0]) {
        const recipes: any = recipe[0];
    console.log('si envio 2');
        this.afs.collection('users', ref => ref.where('uid', '==', recipes.uidUser)).valueChanges().subscribe(user => {
          if (user[0]) {
            const user1: any = user[0];
            console.log('si envio 3');
            if (use1==true) {
              this.afs.collection('mail').add({
            uidUser:user1.uid,
            to: user1.email,
            message: {
              subject: 'Nuevo Comentario',
              html:'Tienes un nuevo comentario en tu receta!!!!'
            }
              })
              use1 = false;
            }
            
          }
        })
      }
    })
  }

  senEmailChat() {
    
  }
}
