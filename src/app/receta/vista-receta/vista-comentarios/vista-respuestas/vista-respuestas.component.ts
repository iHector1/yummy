import { Component, Input, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { HelpService } from 'src/app/receta/service/help.service';

@Component({
  selector: 'app-vista-respuestas',
  templateUrl: './vista-respuestas.component.html',
  styleUrls: ['./vista-respuestas.component.css']
})
export class VistaRespuestasComponent implements OnInit {

  @Input() helpComment: any;
  answer: any;
  answerHighlight: any;
  constructor(private afs: AngularFirestore,private helpService:HelpService) {
    
   }
  limit: number = 1;
  ngOnInit(): void {
    this.answer = this.afs.collection('answer', ref => ref.where('uidHelp', '==', this.helpComment.uid).where('request', "==", 0).orderBy('time', 'asc').limit(this.limit)).valueChanges();
    this.answerHighlight=this.afs.collection('answer', ref => ref.where('uidHelp', '==', this.helpComment.uid).where('request', "==", 1).orderBy('time', 'asc')).valueChanges();
  }
  more() {
    this.limit = this.limit + 1;
    this.answer = this.afs.collection('answer',ref=>ref.where('uidHelp','==',this.helpComment.uid).where('request',"==",0).orderBy('time','asc').limit(this.limit)).valueChanges();
  }
  Highlight(uid: any) {
    this.helpService.highlightAnswer(uid);
  }

}
