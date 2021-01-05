import { Component, Input, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-technique',
  templateUrl: './technique.component.html',
  styleUrls: ['./technique.component.css']
})
export class TechniqueComponent implements OnInit {
  @Input() technique: string[];
  nameTechnique: any;
  constructor(private afs: AngularFirestore) {
   /* */
   }

  ngOnInit(): void {
    this.afs.collection('techniques', ref => ref.where('uid', '==', this.technique)).valueChanges().subscribe(technique => {
      if (technique[0]) {
        const infoTechnique:any = technique[0];
        this.nameTechnique = infoTechnique.nameTechnique;
      }
    })

  }

}
