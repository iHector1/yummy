import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AnyPaint } from 'mapbox-gl';
import { NotificationsService } from 'src/app/notifications/service/notifications.service';

@Injectable({
  providedIn: 'root'
})
export class OptionCommentService {

  constructor(private afs: AngularFirestore,private notifi:NotificationsService) { }
  
  optionReport(data: any) {
    let bander = true;
    this.afs.collection('comment', ref => ref.where('uid', '==', data.uidComment)).valueChanges().subscribe(comment => {
      if (comment[0]) {
        if (bander == true) {
        const commentInfo:any = comment[0];
        const array: string[] = commentInfo.reports ? commentInfo.reports : [];
        if (array.some(x => x === data.user)) {
          window.alert('Ya has reportado esta receta');
        } else {
           
            window.alert('Reporte hecho!')
          array.push(data.user);
          console.log(array);
          this.afs.collection('comment').doc(data.uidComment).set({ reports: array }, { merge: true });
          if (array.length==3) {
            this.afs.collection('comment').doc(data.uidComment).delete();
          }
          this.notifi.sendEmailReportComment(data);
            bander = false; 
          }
          
        }
      }
    })
  }
}
