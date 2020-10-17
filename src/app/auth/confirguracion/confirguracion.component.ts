import { Component, OnInit } from '@angular/core';
import { AuthService} from '../services/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import {DateAdapter} from '@angular/material/core';
import {AngularFireStorage } from '@angular/fire/storage';
import { FormControl, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-confirguracion',
  templateUrl: './confirguracion.component.html',
  styleUrls: ['./confirguracion.component.css']
})
export class ConfirguracionComponent implements OnInit {
  panelOpenState = false;//variable para desplegar las preguntas
  states: Observable<any[]>;//c¿variable para recibir los estados
  category: Observable<any[]>;//variable para recibir las categorias
  maxDate: Date = new Date(2002, 1, 1);//maximo dia del calendario
  minDate:Date=new Date(1910, 12, 12);//minimo dia para el calendario
  registerForm = new FormGroup({
    nameDisplay : new FormControl(''),
    userState: new FormControl(''),
    userCategory: new FormControl(''),
    userDate: new FormControl(''),
    preg1: new FormControl(''),
    preg2: new FormControl(''),
    preg3: new FormControl(''),
    preg4: new FormControl(''),
    preg5: new FormControl(''),
    preg6: new FormControl(''),
    preg7: new FormControl(''),
    preg8: new FormControl(''),
    preg9: new FormControl(''),
    preg10: new FormControl('')
    })
  constructor(firestore:AngularFirestore, private _adapter: DateAdapter<any>) { 
    this.states = firestore.collection('state').valueChanges();
    this.category = firestore.collection('category').valueChanges();
    this._adapter.setLocale('mex');
  } 

  ngOnInit(): void {
  }


  async insert_user() {
    const { nameDisplay, userState, userCategory, userDate, preg1, preg2
      , preg3, preg4, preg5, preg6, preg7, preg8, preg9, preg10 } = this.registerForm.value;
    
    console.log(nameDisplay.trim(),userState, userCategory, userDate, preg1, preg2
    , preg3, preg4, preg5, preg6, preg7, preg8, preg9, preg10);
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
