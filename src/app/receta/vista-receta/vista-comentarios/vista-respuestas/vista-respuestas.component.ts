import { Component, Input, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { HelpService } from 'src/app/receta/service/help.service';
import { User } from 'src/app/shared/models/user.inteface';

@Component({
  selector: 'app-vista-respuestas',
  templateUrl: './vista-respuestas.component.html',
  styleUrls: ['./vista-respuestas.component.css']
})
export class VistaRespuestasComponent implements OnInit {

  @Input() helpComment: any;
  answer: any;
  answerHighlight: any;
  uidUser: any;
  show: boolean;
  constructor(private afs: AngularFirestore, private helpService: HelpService,private authService:AuthService) {
  }
  public user$: Observable<User> = this.authService.afAuth.user;
  limit: number = 1;
  ngOnInit(): void {
    //respuestas no destacadas
    this.answer = this.afs.collection('answer', ref => ref.where('uidHelp', '==', this.helpComment.uid).where('request', "==", 0).orderBy('time', 'asc').limit(this.limit)).valueChanges();
    //algoritmo para verificar el dueño de la pregunta
    this.afs.collection('answer', ref => ref.where('uidHelp', '==', this.helpComment.uid).where('request', "==", 0).orderBy('time', 'asc').limit(this.limit)).valueChanges().subscribe(comment => {
      
      this.user$.subscribe(user => { 
        this.authService.getUser(user.uid).subscribe(userInfo => { 
          if (userInfo[0]) {
            const info: any = userInfo[0];
            this.uidUser = info.uid;
          }
          this.afs.collection('help', ref => ref.where('uid', '==', this.helpComment.uid).where('uidUser', '==', this.uidUser)).valueChanges().subscribe(help => {
            if (help[0]) {
              const helpp:any = help[0];
              if (this.uidUser == helpp.uidUser || this.uidUser == undefined || this.uidUser == "") {
                this.show = true;
              }
              else {
                this.show = false;
              }
            }
          })
          
        })
      })

    });


//preguntas destacadas
    this.answerHighlight=this.afs.collection('answer', ref => ref.where('uidHelp', '==', this.helpComment.uid).where('request', "==", 1).orderBy('time', 'asc')).valueChanges();
  }
  //mostrar mas respuestas
  more() {
    this.limit = this.limit + 1;
    this.answer = this.afs.collection('answer',ref=>ref.where('uidHelp','==',this.helpComment.uid).where('request',"==",0).orderBy('time','asc').limit(this.limit)).valueChanges();
  }
  //destacar una pregunta
  Highlight(uid: any) {
    this.helpService.highlightAnswer(uid);
  }

}
