import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { firestore, User } from 'firebase';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { myCupboard } from 'src/app/shared/models/myCupboaed.interface';
import { CupboardServiceService } from '../service/cupboard-service.service';

@Component({
  selector: 'app-add-cupboard',
  templateUrl: './add-cupboard.component.html',
  styleUrls: ['./add-cupboard.component.css']
})
export class AddCupboardComponent implements OnInit {
  ingredients : Observable<any[]>; // Variable para recibir los ingredientes
  unit : Observable<any[]>; // Variable para recibir la unidad de medida
  itemList : Observable<any[]>;

 cupboardForm = new FormGroup({
    cupboardIngredients: new FormControl(''),
    cupboardQuantity: new FormControl(''),
    cupboardUnit: new FormControl(''),
  });

  constructor(firestore:AngularFirestore, private storage: AngularFireStorage, private cupboardService:CupboardServiceService,private authService:AuthService,private router:Router)
  {
    this.ingredients = firestore.collection('ingredients').valueChanges();
    this.unit = firestore.collection('unit').valueChanges();
    this.itemList = firestore.collection<myCupboard>("myCupboard",ref=>ref.where("uidUser","==",this.router.url.slice(12)))
    .valueChanges()

   } 

  @ViewChild('idUser') inputUserid: ElementRef;
  @ViewChild('list') list: ElementRef;

  public user$: Observable<User> = this.authService.afAuth.user;

  ngOnInit(): void
  {}

  async insert_cupboard() {
    try {
       const { cupboardIngredients, cupboardQuantity, cupboardUnit } = this.cupboardForm.value;
       if(cupboardUnit ==""||cupboardIngredients==""){
         window.alert("Por favor que no esten vacíos ");
       } else if(cupboardQuantity ==" "){
         window.alert("Por favor que no esten vacíos ");
       }
       else if(cupboardQuantity =="  "){
         window.alert("Por favor que no esten vacíos ");
       }
       else if(cupboardQuantity =="   "){
         window.alert("Por favor que no esten vacíos ");
       }
       else if(cupboardQuantity =="    "){
         window.alert("Por favor que no esten vacíos ");
       }
      else {
         const id = Math.random().toString(36).substring(2);
         const cupboardInfo: myCupboard = {
           uid: id,
           uidIngredient: cupboardIngredients,
           cant: cupboardQuantity,
           uidUnit: cupboardUnit,
           uidUser: this.inputUserid.nativeElement.value
         };
         console.log(cupboardInfo);
         this.cupboardService.cupboardCollection(cupboardInfo);
         this.cupboardForm.reset("");
      }
     }
     catch (error) {
       console.log(error);
     }
   }

}
