import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { infoRecipe } from 'src/app/shared/models/infoRecipe.interface';

@Component({
  selector: 'app-newest',
  templateUrl: './newest.component.html',
  styleUrls: ['./newest.component.css']
})
export class NewestComponent implements OnInit {
  newest: any;
	options1: any
  contact=new Array();
  constructor(private afs:AngularFirestore) { 
    this.newest = this.afs.collection("infoRecipe", ref => ref.orderBy("timeStamp", "desc")).valueChanges().subscribe(data => {
      
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
				delay: 500,
				stopOnHover: true,
				speed: 600,
			},
			breakpoints: [
				{
					width: 768,
					number: 1,
				},
				{
					width: 991,
					number: 4,
				},
				{
					width: 9999,
					number: 7,
				},
			],
		}
  }

  
  ngOnInit(): void {
    
  }

}
