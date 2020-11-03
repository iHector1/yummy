import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { Router } from '@angular/router';
import { firestore } from 'firebase';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/services/auth.service';
import { ingredient } from '../shared/models/ingredients.interface';
import { User } from '../shared/models/user.inteface';
import { IngredientsServiceService } from './service/ingredients-service.service';
@Component({
  selector: 'app-ingredients',
  templateUrl: './ingredients.component.html',
  styleUrls: ['./ingredients.component.css']
})
export class IngredientsComponent implements OnInit {
  uidUnit: Observable<any[]>;// Variable para recibir el nombre de las unidades
  request: Observable<any[]>;// Variable para recibir las peticiones
  
  //variables del formulario
  ingredientForm = new FormGroup({
    kindFoodName: new FormControl('', [
      //Validators.minLength(3)
    ]),
    ingredientName: new FormControl('', [
      //Validators.required
    ]),
    uidUnit: new FormControl('')
  });
  constructor(firestore:AngularFirestore, private storage: AngularFireStorage, private ingredientService:IngredientsServiceService,private authService:AuthService,private router:Router) { 
    this.uidUnit = firestore.collection('unitMeasurement').valueChanges();
  }

  @ViewChild('idUser') inputUserid: ElementRef;
  public user$: Observable<User> = this.authService.afAuth.user;
  
  ngOnInit(): void {
  }
  insert_ingredient() {
    try {
      const { ingredientName, kindFoodName, uidUnit } = this.ingredientForm.value;
      if (ingredientName == " ") {
        window.alert("Por favor que no esten vacios ");
      } else if (ingredientName == "  ") {
        window.alert("Por favor que no esten vacios ");
      }
      else if (ingredientName == "   ") {
        window.alert("Por favor que no esten vacios ");
      }
      else if (ingredientName == "    ") {
        window.alert("Por favor que no esten vacios ");
      }
      else if (ingredientName == "     ") {
        window.alert("Por favor que no esten vacios ");
      }
      else {
        const id = Math.random().toString(36).substring(2);
        let ingredientNameC = this.MaysPrimera(ingredientName);
        const ingredient: ingredient = {
          uid: id,
          uidUnit: uidUnit,
          nameIngredient: ingredientNameC,
          request: [this.inputUserid.nativeElement.value]
        };
        
        console.log(ingredient, this.inputUserid.nativeElement.value, kindFoodName);
        this.ingredientService.ingredientCollection(ingredient,this.inputUserid. nativeElement.value,kindFoodName);
        this.router.navigate(['/home']);
      }
    }
    catch (err) {
      console.log(err);
    }
  }
  MaysPrimera(string){
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
}
