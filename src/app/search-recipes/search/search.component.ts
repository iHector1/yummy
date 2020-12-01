import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'firebase';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  techniques: Observable<any[]>;// Variable para recibir la tecnica de la receta
  category: Observable<any[]>;// Variable para recibir la categoría de la receta
  season: Observable<any[]>;// Variable para recibir la temporada de la receta
  region: Observable<any[]>;// Variable para recibir la región de la receta
  collection: Observable<any[]>;// Variable para recibir la colección de la receta

  //variables del formulario
  recipeSavedForm = new FormGroup({
    recipeSavedTechnique: new FormControl('', [
    ]),
    recipeSavedCategory: new FormControl('', [
    ]),
    recipeSavedSeason: new FormControl('', [
    ]),
    recipeSavedRegion: new FormControl('', [
    ]),
    recipeSavedCollection: new FormControl('', [
    ]),
  });

  constructor(firestore:AngularFirestore, private storage: AngularFireStorage, private authService:AuthService,private router:Router)
  {
    this.techniques = firestore.collection('techniques').valueChanges();
    this.category = firestore.collection('category').valueChanges();
    this.season = firestore.collection('season').valueChanges();
    this.region = firestore.collection('region').valueChanges();
    this.collection = firestore.collection('collection').valueChanges();
  }

  @ViewChild('idUser') inputUserid: ElementRef;
  public user$: Observable<User> = this.authService.afAuth.user;

  ngOnInit(): void {
  }


}
