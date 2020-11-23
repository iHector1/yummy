import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { BehaviorSubject, Observable } from 'rxjs';
import { __values } from 'tslib';

@Injectable({
  providedIn: 'root'
})
export class ChatService {


  private pathParamState = new BehaviorSubject<string>('');
  pathParam: Observable<string>;
  constructor(private afs:AngularFirestore) { 


    this.pathParam = this.pathParamState.asObservable();
  }

  updatePathParamState(newPathParam: string): void {
    this.pathParamState.next(newPathParam);
  }
}
