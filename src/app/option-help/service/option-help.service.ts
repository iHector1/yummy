import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { NotificationsService } from 'src/app/notifications/service/notifications.service';

@Injectable({
  providedIn: 'root'
})
export class OptionHelpService {

  constructor(private afs:AngularFirestore,private notifi:NotificationsService) { }

  optionReport(data: any) {
    let bander = true;
    this.afs.collection('help', ref => ref.where('uid', '==', data.uidhelp)).valueChanges().subscribe(comment => {
      if (comment[0]) {
        if (bander == true) {
        const commentInfo:any = comment[0];
        const array: string[] = commentInfo.reports ? commentInfo.reports : [];
        if (array.some(x => x === data.user)) {
          window.alert('Ya has reportado esta pregunta');
        } else {
           
            window.alert('Reporte hecho!')
          array.push(data.user);
          console.log(array);
          this.afs.collection('help').doc(data.uidhelp).set({ reports: array }, { merge: true });
          if (array.length==3) {
            this.afs.collection('help').doc(data.uidComment).delete();
          }
          this.notifi.sendEmailReportHelp(data);
            bander = false; 
          }
          
        }
      }
    })
  }
}
