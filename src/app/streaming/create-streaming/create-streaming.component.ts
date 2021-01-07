import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import * as firebase from 'firebase/app';
import { DateAdapter } from '@angular/material/core';
import { stream } from '../../shared/models/stream.inteface';
import { StreamingService } from '../service/streaming.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { User } from 'src/app/shared/models/user.inteface';

@Component({
  selector: 'app-create-streaming',
  templateUrl: './create-streaming.component.html',
  styleUrls: ['./create-streaming.component.css']
})
export class CreateStreamingComponent implements OnInit {
  uidUnit: Observable<any[]>;//Variable para recibir las unidades de medida de los ingredientes
  uidCookWare: Observable<any[]>;// Variable para recibir los utensilios
  uidIngredients: Observable<any[]>;// Variable para recibir los ingredientes
  streamForm = new FormGroup({
    uidsIngredients: new FormControl(''),
    uidsUnit: new FormControl(''),
    uidsCookWare: new FormControl(''),
    date:new FormControl('')
  });
  @ViewChild('cantt') inputCant: ElementRef;
  cook=new Array();
  ingredient = new Array();//nombre del ingrediente
  unitnew =new Array();
  cant=new Array();
  uidunit: any;
  unit = new Array();
  minDate: Date;
  displayName: any;
  uidUser: any;

  constructor(private firestore:AngularFirestore, private storage: AngularFireStorage,private _adapter: DateAdapter<any>,private streamService:StreamingService,private router:Router,private auth:AuthService) { 
    this.uidUnit = this.firestore.collection('unit').valueChanges();
    this.uidCookWare = this.firestore.collection('cookWare', ref => ref.where("requests", ">=", 3)).valueChanges();
    this.uidIngredients = this.firestore.collection('ingredients', ref => ref.where("requests", ">=", 3)).valueChanges();
    this.minDate = new Date();
    this._adapter.setLocale('mex');
    this.user$.subscribe(user => {
      this.uidUser= user.uid;
      this.auth.getUser(this.uidUser).subscribe(infoUser => {
        if (infoUser[0]) {
          const userInfo: any = infoUser[0];
          this.displayName = userInfo.displayName;
        }
      })
    });
  }
  public user$: Observable<User> = this.auth.afAuth.user;
  
  ngOnInit(): void {
  }
  addIngredient() {
    if (this.streamForm.controls.uidsUnit.value != " " &&this.streamForm.controls.uidsIngredients.value != " " && this.inputCant.nativeElement.value != "") { 
      this.ingredient.push(this.streamForm.controls.uidsIngredients.value["nameIngredient"]);
      this.unit.push(this.streamForm.controls.uidsUnit.value["unitName"]);
      this.cant.push( this.inputCant.nativeElement.value);
    //  console.log(this.ingredient);
    }
    else {
      window.alert('ingrese todos los datos por favor');
    }
  }
  addCookWare() {
    if (this.streamForm.controls.uidsCookWare.value!=" " ) {
      this.cook.push(this.streamForm.controls.uidsCookWare.value["nameCookWare"]);
    }
    else{
      window.alert("La casilla del utensilio esta vacia, porfavor intenta de nuevo");
    }
  }

  submit() {
    if (this.ingredient.length<=0) {
      window.alert('Inserta ingredientes por favor');
    }
    else if (this.cook.length<=0) {
      window.alert('Inserta utensilios por favor');
    }
    else if (this.streamForm.controls.date.value==" "||this.streamForm.controls.date.value=="") {
      window.alert('inserta fecha del streaming');
      
    }
    else {
      const id = Math.random().toString(36).substring(2);
      const data: stream = {
        uid:id,
        uidIngredient: this.ingredient,
        uidCookWare: this.cook,
        uidUnit: this.unit,
        cant: this.cant,
        date: this.streamForm.controls.date.value,
        uidUser: this.uidUser,
        nameDisplay: this.displayName
      };
      //console.log(data);
     this.streamService.create_streaming(data);
      this.router.navigate(['/home']);
    }
  }
}
