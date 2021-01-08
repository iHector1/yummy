import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/services/auth.service';

@Component({
  selector: 'app-planned-recipes',
  templateUrl: './planned-recipes.component.html',
  styleUrls: ['./planned-recipes.component.css']
})
export class PlannedRecipesComponent implements OnInit {
  recipes:Observable<any>;

  constructor(private afs: AngularFirestore, private auth: AuthService,private router:Router) {
    this.recipes = this.afs.collection('plannedRecipe', ref => ref.where('uidUser', '==', this.router.url.slice(19)).orderBy('date', 'asc')).valueChanges();
   }

  ngOnInit(): void {
  }

}
