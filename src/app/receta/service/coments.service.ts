import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { comments } from 'src/app/shared/models/comments.interface';
@Injectable({
  providedIn: 'root'
})
export class ComentsService {

  constructor(private afs: AngularFirestore) { }
  
  insert_coment(comment:comments) {
    const commentRef: AngularFirestoreDocument<comments> = this.afs.doc(`comment/${comment.uid}`);

    return commentRef.set(comment, { merge: true });
  }
}
