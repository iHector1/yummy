import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { answerComment } from 'src/app/shared/models/answer.interface';
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
  insert_answer(answerComent: answerComment) {
    const commentRef: AngularFirestoreDocument<any> = this.afs.doc(`answer/${answerComent.uid}`);

    return commentRef.set(answerComent, { merge: true });
  }
  highlightAnswer(uid) {
    const request =1;
    const commentRef: AngularFirestoreDocument<any> = this.afs.doc(`answer/${uid}`);
    return commentRef.set({request:request}, { merge: true });
  }
}
