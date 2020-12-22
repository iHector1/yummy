import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { NotificationsService } from 'src/app/notifications/service/notifications.service';
import { comments } from 'src/app/shared/models/comments.interface';
@Injectable({
  providedIn: 'root'
})
export class ComentsService {

  constructor(private afs: AngularFirestore,private noti:NotificationsService) { }
  
  insert_coment(comment:comments) {
    const commentRef: AngularFirestoreDocument<comments> = this.afs.doc(`comment/${comment.uid}`);
    this.noti.sendEmailComment(comment.uidRecipe);
    return commentRef.set(comment, { merge: true });
  }
}
