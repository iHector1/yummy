import { Component, OnInit } from '@angular/core';
import { AuthService} from '../services/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import {DateAdapter} from '@angular/material/core';
import {AngularFireStorage } from '@angular/fire/storage';
@Component({
  selector: 'app-confirguracion',
  templateUrl: './confirguracion.component.html',
  styleUrls: ['./confirguracion.component.css']
})
export class ConfirguracionComponent implements OnInit {
  panelOpenState = false;
  states: Observable<any[]>;
  category: Observable<any[]>;
  maxDate: Date = new Date(2002, 1, 1);
  minDate:Date=new Date(1910, 12, 12);

  constructor(firestore:AngularFirestore, private _adapter: DateAdapter<any>) { 
    this.states = firestore.collection('state').valueChanges();
    this.category = firestore.collection('category').valueChanges();
    this._adapter.setLocale('mex');
  } 

  ngOnInit(): void {
  }

  onItem(value) {
    console.log("VAlor es :", value);
  }
  onUpload(e) {
  /*  const id = Math.random().toString(36).substring(2);
    const file = e.target.files[0];
    const filePath = `photoUser/profile_${id}`;
    const ref = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);
    this.uploadPercent = task.percentageChanges();
    task.snapshotChanges().pipe(finalize(() => this.urlImage = ref.getDownloadURL())).subscribe();*/
  }
}
