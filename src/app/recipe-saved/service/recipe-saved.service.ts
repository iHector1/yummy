import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { infoRecipe } from 'src/app/shared/models/infoRecipe.interface';

@Injectable({
  providedIn: 'root'
})
export class RecipeSavedService {

  constructor(private afs: AngularFirestore) { }


}
