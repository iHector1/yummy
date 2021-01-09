import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { NotificationsService } from 'src/app/notifications/service/notifications.service';
import { infoRecipe } from '../../shared/models/infoRecipe.interface';
@Injectable({
  providedIn: 'root'
})
export class OptionServiceService {

  constructor(private afs: AngularFirestore,private notifi:NotificationsService) { }
  optionReport(data: any) {
    let bander = true;
    this.afs.collection('infoRecipe', ref => ref.where('uid', '==', data.recipe)).valueChanges().subscribe(recipe => {
      if (recipe[0]) {
        if (bander == true) {
        const infoRecipe: infoRecipe = recipe[0];
        const array: string[] = infoRecipe.reports ? infoRecipe.reports : [];
        if (array.some(x => x === data.user)) {
          window.alert('Ya has repostado esta receta');
        } else {
          
            window.alert('Reporte hecho!')
          array.push(data.user);
          this.afs.collection('infoRecipe').doc(data.recipe).set({ reports: array }, { merge: true });
          if (array.length==3) {
            this.afs.collection('infoRecipe').doc(data.recipe).delete();
          }
          this.notifi.sendEmailReport(data);
            bander = false; 
          }
          
        }
      }
    })
  }
}
