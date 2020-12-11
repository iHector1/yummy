import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { helpComment } from 'src/app/shared/models/help.interface';

@Injectable({
  providedIn: 'root'
})
export class HelpService {

  constructor(private afs: AngularFirestore) {
  }
  
  insert_help(helpComent: helpComment) { 
    const commentRef: AngularFirestoreDocument<any> = this.afs.doc(`help/${helpComent.uid}`);

    return commentRef.set(helpComent, { merge: true });
  }
}
