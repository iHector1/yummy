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
  contact=new Array();
  constructor(private afs: AngularFirestore) {
    this.newest = this.afs.collection("infoRecipe",ref=>ref.where('requests','>',4)).valueChanges().subscribe(data => {
      
			this.contact = [];
	  
				  data.forEach( ( x ) => {
            if (x['stars']>4) {
              this.contact.push( x );
            }
				  });
				  this.slides = this.chunk(this.contact, 3)
	  //console.log(this.contact);
		  }, err => { });
  }

	ngOnInit(): void {
		
	}
	slides: any = [[]];
  chunk(arr: any, chunkSize: any) {
    let R = [];
    for (let i = 0, len = arr.length; i < len; i += chunkSize) {
      R.push(arr.slice(i, i + chunkSize));
    }
    return R;
  }

}
