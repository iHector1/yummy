import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';

@Injectable({   
  providedIn: 'root'
})
export class NotificationsService {

  constructor(private afs: AngularFirestore) { }
}
