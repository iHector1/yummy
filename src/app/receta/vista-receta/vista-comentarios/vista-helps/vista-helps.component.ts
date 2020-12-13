import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { helpComment } from 'src/app/shared/models/help.interface';
import * as firebase from 'firebase/app';
import { AuthService } from 'src/app/auth/services/auth.service';
import { User } from 'src/app/shared/models/user.inteface';
import { HelpService } from 'src/app/receta/service/help.service';
import { answerComment } from 'src/app/shared/models/answer.interface';
@Component({
  selector: 'app-vista-helps',
  templateUrl: './vista-helps.component.html',
  styleUrls: ['./vista-helps.component.css']
})
export class VistaHelpsComponent implements OnInit {
  helps: Observable<any>;
  helpComment: any[]=[];
  comentHelpForm = new FormGroup({
    coment: new FormControl('')
  });
  comentAnswerForm = new FormGroup({
    comentAnswer: new FormControl('')
  });
  uidUser: any;
  displayName: any;
  com: any;
  constructor(private afs: AngularFirestore,private router:Router,private authService: AuthService,private helpService:HelpService) { 
    this.helps = this.afs.collection('help', ref => ref.where('uidRecipe', '==', this.router.url.slice(8)).orderBy('timeStamp','asc')).valueChanges();
    this.afs.collection('help', ref => ref.where('uidRecipe', '==', this.router.url.slice(8))).valueChanges().subscribe((help: any[]) => {
      this.helpComment = help;
    });
  }
  public user$: Observable<User> = this.authService.afAuth.user;
  ngOnInit(): void {
    this.user$.subscribe(user => {
      this.authService.getUser(user.uid).subscribe(userInfo => {
        if (userInfo[0]) {
          const info: any = userInfo[0];
          this.uidUser = info.uid;
          this.displayName = info.displayName;
          console.log(this.displayName);
        }
      })
    });
  }
  insert_help() {
    const { coment } = this.comentHelpForm.value;
    const id = Math.random().toString(36).substring(2);
    const commentHelp: helpComment = {
      uid: id,
      helpComment: coment,
      timeStamp: firebase.firestore.FieldValue.serverTimestamp(),
      uidRecipe: this.router.url.slice(8),
      uidUser: this.uidUser,
      displayName: this.displayName
    };
    this.helpService.insert_help(commentHelp);
    this.comentHelpForm.reset();
  }
  insert_answer(uidHelp) {
    const { comentAnswer } = this.comentAnswerForm.value;
    const id = Math.random().toString(36).substring(2);
    const commentAnswer: answerComment = {
      uid:id,
      time: firebase.firestore.FieldValue.serverTimestamp(),
      uidHelp: uidHelp,
      uidUser: this.uidUser,
      displayName: this.displayName,
      comment:comentAnswer,
      request: 0
    };
    console.log(commentAnswer);
    this.helpService.insert_answer(commentAnswer);
    this.comentAnswerForm.reset();
  }

}
