import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-vista-comentarios',
  templateUrl: './vista-comentarios.component.html',
  styleUrls: ['./vista-comentarios.component.css']
})
export class VistaComentariosComponent implements OnInit {
  exce: Observable<any>;
  med: Observable<any>;
  mal: Observable<any>;
  
  constructor(private afs: AngularFirestore) {
    this.exce = this.afs.collection("comment", ref => ref.where("stars", ">", "3")).valueChanges();
    this.med = this.afs.collection("comment", ref => ref.where("stars", "==","3")).valueChanges();
    this.mal = this.afs.collection("comment", ref => ref.where("stars", "<","3")).valueChanges();
   }

  ngOnInit(): void {
  }

}
