import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { state} from '../../shared/models/state.interface';

@Injectable({
  providedIn: 'root'
})
export class StatesService {
 
  constructor() { }
}
