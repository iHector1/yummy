import { Route } from '@angular/compiler/src/core';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'firebase';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { comments } from 'src/app/shared/models/comments.interface';
import { infoRecipe } from 'src/app/shared/models/infoRecipe.interface';
import { ComentsService } from '../../service/coments.service';
import { RecetaService } from '../../service/receta.service';

@Component({
  selector: 'app-coment',
  templateUrl: './coment.component.html',
  styleUrls: ['./coment.component.css']
})
export class ComentComponent implements OnInit {

  dificultys: Observable<any[]>;// Variable para recibir la dificultad de la receta

  //variables del formulario
  comentForm = new FormGroup({
    coment: new FormControl(''),
    difficult: new FormControl(''),
    stars:new FormControl('')
  });
  uidUser: string;
  displayName: string;
  requests: any;
  difficult: any;
  stars: any;
  
  constructor(firestore:AngularFirestore, private storage: AngularFireStorage, private authService:AuthService,private router:Router,private comments:ComentsService,private recipe:RecetaService)
  {
    this.dificultys = firestore.collection('dificulty').valueChanges();
    firestore.collection('infoRecipe', ref => ref.where("uid", "==", this.router.url.slice(8))).valueChanges().subscribe(
      recipe => {
        if (recipe[0]) {
          const recipes: any = recipe[0];
          this.requests = recipes.requests ? recipes.requests : 0;
          this.difficult = recipes.difficult ? recipes.difficult : 0;
          this.stars = recipes.stars ? recipes.stars : 0;
        }
        
      }
    )
  }
  public user$: Observable<User> = this.authService.afAuth.user;

  ngOnInit(): void {
    this.user$.subscribe(user => {
      this.uidUser = user.uid;
      this.displayName = user.displayName;
    });
  }
  insert_coment() {
    const { coment, difficult, stars } = this.comentForm.value;
    const uidRecipe=this.router.url.slice(8)
    console.log(coment, difficult, stars, uidRecipe);
    const comment: comments = {
      comment: coment,
      difficult: difficult,
      stars: stars,
      uidRecipe: uidRecipe,
      uidUser: this.uidUser,
      uid:this.uidUser,
      displayName:this.displayName
    };
    this.difficult = this.difficult * this.requests;
    this.stars = this.stars * this.requests;
    this.requests = this.requests + 1;
    this.difficult = (this.difficult + difficult) / this.requests;
    this.stars = (this.stars + stars) / this.requests;
    this.comments.insert_coment(comment);
    this.recipe.updateRecipe(this.requests,this.stars,this.difficult,this.router.url.slice(8));
    window.alert("haz hecho un comentario");
  }

}
