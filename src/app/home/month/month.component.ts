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
  contact: Array<infoRecipe>;
  constructor(private afs: AngularFirestore) {
    
	this.newest = this.afs.collection("infoRecipe", ref => ref.where("uidSeason","==","Invierno")).valueChanges().subscribe(data => {
      
      this.contact = [];

            data.forEach( ( x ) => {

                this.contact.push( x );
            } );
console.log(this.contact);
    }, err => { });
    
    this.options1 = {
			animation: {
				animationClass: 'transition',
				animationTime: 500,
			},
			swipe: {
				swipeable: true,
				swipeVelocity: .004,
			},
			drag: {
				draggable: true,
				dragMany: true,
			},
      arrows: true,
			infinite: true,
			autoplay: {
				enabled: true,
				direction: 'right',
				delay: 5000,
				stopOnHover: true,
				speed: 6000,
			},
			breakpoints: [
				{
					width: 768,
					number: 1,
				},
				{
					width: 991,
					number: 3,
				},
				{
					width: 9999,
					number: 4,
				},
			],
		}
   }

  ngOnInit(): void {
  }
}
