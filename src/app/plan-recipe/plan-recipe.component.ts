
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import {DateAdapter} from '@angular/material/core';

@Component({
  selector: 'app-plan-recipe',
  templateUrl: './plan-recipe.component.html',
  styleUrls: ['./plan-recipe.component.css']
})
export class PlanRecipeComponent implements OnInit {
  minDate: Date = new Date();
  foodTime: Observable<any>;
  constructor(public dialog: MatDialog, private router: Router, private afs: AngularFirestore,private _adapter: DateAdapter<any>) {
    console.log(this.router.url.slice(8));
    this.foodTime = this.afs.collection('foodTime').valueChanges();
    this._adapter.setLocale('mex');
   }

  ngOnInit(): void {
  }

}
