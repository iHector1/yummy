import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { infoRecipe } from 'src/app/shared/models/infoRecipe.interface';
import { HomeService } from '../Service/home.service';

@Component({
  selector: 'app-month',
  templateUrl: './month.component.html',
  styleUrls: ['./month.component.css']
})
export class MonthComponent implements OnInit {

  newest: any;
	options1: any
  contact=new Array();
  constructor(private afs: AngularFirestore) {
    
	this.newest = this.afs.collection("infoRecipe", ref => ref.where("uidSeason","==","Invierno")).valueChanges().subscribe(data => {
      
      this.contact = []; 

            data.forEach( ( x ) => {

                this.contact.push( x );
			});
			this.slides = this.chunk(this.contact, 3)
//console.log(this.contact);
    }, err => { });
    
   }
   slides: any = [[]];
   chunk(arr: any, chunkSize: any) {
	 let R = [];
	 for (let i = 0, len = arr.length; i < len; i += chunkSize) {
	   R.push(arr.slice(i, i + chunkSize));
	 }
	 return R;
   }
  ngOnInit(): void {
  }
}
