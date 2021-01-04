import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { NotificationsService } from 'src/app/notifications/service/notifications.service';
import { stream } from 'src/app/shared/models/stream.inteface';

@Injectable({
  providedIn: 'root'
})
export class StreamingService {

  constructor(private afs: AngularFirestore,private notifi:NotificationsService) { }
  
  create_streaming(dataStreaming:stream) {
    const streamingRef: AngularFirestoreDocument<stream> = this.afs.doc(
      `stream/${dataStreaming.uid}`
    );
    this.notifi.sendEmailStrem(dataStreaming.uidUser, dataStreaming);
    return streamingRef.set(dataStreaming, { merge: true });
  }
}
