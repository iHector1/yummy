import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { stream } from 'src/app/shared/models/stream.inteface';

@Injectable({
  providedIn: 'root'
})
export class StreamingService {

  constructor(private afs: AngularFirestore) { }
  
  create_streaming(dataStreaming:stream) {
    const streamingRef: AngularFirestoreDocument<stream> = this.afs.doc(
      `stream/${dataStreaming.uid}`
    );
    return streamingRef.set(dataStreaming, { merge: true });
  }
}
