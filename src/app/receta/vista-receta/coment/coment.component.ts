import { Route } from '@angular/compiler/src/core';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'firebase';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { infoRecipe } from 'src/app/shared/models/infoRecipe.interface';
import { RecetaService } from '../../service/receta.service';

@Component({
  selector: 'app-coment',
  templateUrl: './coment.component.html',
  styleUrls: ['./coment.component.css']
})
export class ComentComponent implements OnInit {

  dificulty: Observable<any[]>;// Variable para recibir la dificultad de la receta

  //variables del formulario
  comentForm = new FormGroup({
    comentDificulty: new FormControl('', [
    ]),
  });

  constructor(firestore:AngularFirestore, private storage: AngularFireStorage, private recetaService:RecetaService,private authService:AuthService,private router:Router)
  {
    this.dificulty = firestore.collection('dificulty').valueChanges();
  }

  @ViewChild('idUser') inputUserid: ElementRef;
  public user$: Observable<User> = this.authService.afAuth.user;

  ngOnInit(): void {
  }


}
