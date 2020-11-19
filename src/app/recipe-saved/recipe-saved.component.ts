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

  constructor(firestore:AngularFirestore, private storage: AngularFireStorage, private recipeSavedService:RecipeSavedService,private authService:AuthService,private router:Router)
  {
    this.category = firestore.collection('category').valueChanges();
   }

  @ViewChild('idUser') inputUserid: ElementRef;
  public user$: Observable<User> = this.authService.afAuth.user;

  ngOnInit(): void {
  }

}
