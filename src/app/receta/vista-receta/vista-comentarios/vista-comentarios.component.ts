import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { OptionCommentComponent } from 'src/app/option-comment/option-comment.component';
import { User } from 'src/app/shared/models/user.inteface';

@Component({
  selector: 'app-vista-comentarios',
  templateUrl: './vista-comentarios.component.html',
  styleUrls: ['./vista-comentarios.component.css']
})
export class VistaComentariosComponent implements OnInit {
  exce: Observable<any>;
  med: Observable<any>;
  mal: Observable<any>;
  showOption: boolean = false;
  userid: string;
  
  constructor(private afs: AngularFirestore,private router:Router, private auth:AuthService,private dialog:MatDialog) {
    this.exce = this.afs.collection("comment", ref => ref.where("stars", ">", "3").where("uidRecipe",'==',this.router.url.slice(8))).valueChanges();
    this.med = this.afs.collection("comment", ref => ref.where("stars", "==","3").where("uidRecipe",'==',this.router.url.slice(8))).valueChanges();
    this.mal = this.afs.collection("comment", ref => ref.where("stars", "<","3").where("uidRecipe",'==',this.router.url.slice(8))).valueChanges();
   }
   public user$: Observable<User> = this.auth.afAuth.user;
  ngOnInit(): void {
    this.user$.subscribe(user => {
      try {
        this.userid = user.uid;
        this.showOption=true
      } catch (err) {
        this.showOption = false;
      }
      console.log(this.showOption);
    })
  }

  openOptions(uidcoment) {
    this.dialog.open(OptionCommentComponent, { data: { uidUser: this.userid ,uidComment:uidcoment} });
  }
}
