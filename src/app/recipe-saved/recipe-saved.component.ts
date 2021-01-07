import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'firebase';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/services/auth.service';
import { infoRecipe } from '../shared/models/infoRecipe.interface';
import { RecipeSavedService } from './service/recipe-saved.service';

@Component({
  selector: 'app-recipe-saved',
  templateUrl: './recipe-saved.component.html',
  styleUrls: ['./recipe-saved.component.css']
})
export class RecipeSavedComponent implements OnInit {

  category: Observable<any[]>;// Variable para recibir la categoría de la receta

  //variables del formulario
  recipeSavedForm = new FormGroup({
    recipeSavedCategory: new FormControl('', [
    ]),
  });
  uidUser: any;
  recipe: any;
  uidCategory: any;

  constructor(private firestore:AngularFirestore, private storage: AngularFireStorage, private recipeSavedService:RecipeSavedService,private authService:AuthService,private router:Router)
  {
    this.category = firestore.collection('category').valueChanges();
    this.user$.subscribe(user => {
      this.authService.getUser(user.uid).subscribe(userInfo => {
        if (userInfo[0]) {
          const info: any = userInfo[0];
          this.uidUser = info.uid;
          this.recipe = firestore.collection('saved', ref => ref.where("uidUser", "==", this.uidUser)).valueChanges();
        }
      }
      )
    });
  }
  public user$: Observable<User> = this.authService.afAuth.user;

  ngOnInit(): void {
  }

  search() {
    const { recipeSavedCategory } = this.recipeSavedForm.value;
    this.uidCategory = recipeSavedCategory;
    this.recipe = this.firestore.collection('saved', ref => ref.where("uidUser", "==", this.uidUser).where('uidCategory',"==",recipeSavedCategory)).valueChanges();
   // console.log(recipeSavedCategory);
    
  }
}
