import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'firebase';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/services/auth.service';
import { superList } from '../shared/models/superList.interface';
import { SuperlistService } from './service/superlist.service';

@Component({
  selector: 'app-super-list',
  templateUrl: './super-list.component.html',
  styleUrls: ['./super-list.component.css']
})
export class SuperListComponent implements OnInit {

  ingredients : Observable<any[]>; // Variable para recibir los ingredientes
  unit : Observable<any[]>; // Variable para recibir la unidad de medida

  //variables del formulario
  superlistForm = new FormGroup({
    superlistIngredients: new FormControl('', [
    ]),
    superlistQuantity: new FormControl('', [
    ]),
    superlistUnit: new FormControl('', [
    ]),
  });

  constructor(firestore:AngularFirestore, private storage: AngularFireStorage, private superlistService:SuperlistService,private authService:AuthService,private router:Router)
  {
    this.ingredients = firestore.collection('ingredients').valueChanges();
    this.unit = firestore.collection('unit').valueChanges();
  }

  @ViewChild('idUser') inputUserid: ElementRef;
  public user$: Observable<User> = this.authService.afAuth.user;

  ngOnInit(): void {
  }

  async insert_superlist() {
    try {
      const { superlistIngredients, superlistQuantity, superlistUnit } = this.superlistForm.value;
      if(superlistUnit ==" "){
        window.alert("Por favor que no esten vacios ");
      } else if(superlistUnit =="  "){
        window.alert("Por favor que no esten vacios ");
      }
      else if(superlistUnit =="   "){
        window.alert("Por favor que no esten vacios ");
      }
      else if(superlistUnit =="    "){
        window.alert("Por favor que no esten vacios ");
      }
      else if(superlistUnit =="     "){
        window.alert("Por favor que no esten vacios ");
      }
     else {
        const id = Math.random().toString(36).substring(2);
        //let superlistUnitC = superlistUnit;
        const superlistInfo: superList = {
          uid: id,
          uidIngredient: superlistIngredients,
          cant: superlistQuantity,
          uidUnit: superlistUnit

        };
        console.log(superlistInfo);
        this.superlistService.superlistDataAdd(superlistInfo/*, this.inputUserid.nativeElement.value*/);
        this.router.navigate(['/home']);
     }
    }
    catch (error) {
      console.log(error);
    }
  }

}
