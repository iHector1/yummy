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
    this.newest = this.afs.collection("infoRecipe", ref => ref.orderBy("timeStamp", "desc").limit(9)).valueChanges().subscribe(data => {
      
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
