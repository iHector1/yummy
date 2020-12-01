import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { AuthService } from 'src/app/auth/services/auth.service';
import { infoRecipe } from 'src/app/shared/models/infoRecipe.interface';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {
  
  recipe: Observable<infoRecipe[]>;
  displayName: any;
  constructor(private firestore: AngularFirestore,private router: Router, private auth: AuthService) { }
 
  ngOnInit(): void {
    this.recipe = this.firestore.collection("infoRecipe", ref => ref.where("uidUser", "==", this.router.url.slice(9))).valueChanges();

    this.auth.getUser(this.router.url.slice(9)).subscribe(user => {
      if (user[0]) {
        const uiUser: any = user[0];
        this.displayName = uiUser.displayName; 
      }
    });

  }

}
