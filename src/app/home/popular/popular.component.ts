import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { infoRecipe } from 'src/app/shared/models/infoRecipe.interface';

@Component({
  selector: 'app-popular',
  templateUrl: './popular.component.html',
  styleUrls: ['./popular.component.css']
})
export class PopularComponent implements OnInit {
  newest: any;
	options1: any
  contact: Array<infoRecipe>;
  constructor(private afs: AngularFirestore) { 
    
    this.newest = this.afs.collection("infoRecipe", ref => ref.orderBy("timeStamp", "desc").where("uidCollection","==","Invierno")).valueChanges().subscribe(data => {
      
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
