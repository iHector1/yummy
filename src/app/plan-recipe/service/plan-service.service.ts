import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { CupboardServiceService } from 'src/app/cupboard/service/cupboard-service.service';
import { NotificationsService } from 'src/app/notifications/service/notifications.service';
import { infoRecipe } from 'src/app/shared/models/infoRecipe.interface';
import { plannedRecipe } from 'src/app/shared/models/plannedRecipe.interface';
import { superList } from 'src/app/shared/models/superList.interface';
import { SuperlistService } from 'src/app/super-list/service/superlist.service';

@Injectable({
  providedIn: 'root'
})
export class PlanServiceService {

  constructor(private afs: AngularFirestore,private superListService:SuperlistService,private cupboardService:CupboardServiceService,private notifi:NotificationsService) { }
  
  add(recipe: plannedRecipe) {
    let bander = true;
    this.afs.collection('plannedRecipe', ref => ref.where('uidUser', '==', recipe.uidUser).where('date', '==', recipe.date).where('time', '==', recipe.time)).valueChanges().subscribe(planRecipe => {
      if (bander==true) {
        if (planRecipe[0]) {
          window.alert('Ya existe una receta para ese tiempo en esa fecha,selecciona otros campos');
          bander = false;
        } else {
          this.afs.collection('plannedRecipe').doc(recipe.uid).set(recipe);
          this.cupboardUpdate(recipe);
          window.alert('Receta Planeada!');
          this.notifi.senEmailPlanRecipe(recipe);
          bander = false;
        }
      }
    })
    
  }
  cupboardUpdate(recipe: plannedRecipe) {
    const uidUser = recipe.uidUser;
    this.afs.collection('infoRecipe', ref => ref.where('uid', "==", recipe.uidRecipe)).valueChanges().subscribe(recipe => {
      if (recipe[0]) {
        const infoRecipe:any = recipe[0];
        const legth = infoRecipe.count.length;
        //console.log(legth);
        for (let index = 0; index < legth; index++) {
         // console.log(infoRecipe.uidsIngredients[index],infoRecipe.count[index],infoRecipe.uidUnit[index]);
         this.cupboardUser(uidUser,infoRecipe.uidsIngredients[index],infoRecipe.count[index],infoRecipe.uidUnit[index]);
          
        }
      }
    })
  }

  private cupboardUser(uidUser, uidIngredient,cant,uidUnit) {
    let bander = true;
    var cant2 = Number(cant);
          this.afs.collection('myCupboard', ref => ref.where('uidUser', '==', uidUser).where('uidIngredient', "==", uidIngredient).where('uidUnit', "==", uidUnit)).valueChanges().subscribe(ingredient => {
            if (bander == true) {
              if (ingredient[0]) {
                const infoCup: any = ingredient[0];
                bander = false;
                  console.log(infoCup.cant,cant2);
                   if (infoCup.cant==cant2) {
                     this.cupboardService.deleteItems(uidUser, infoCup.uid);
                }else if (infoCup.cant < cant2) {
                  console.log('si soy mayor del que esta');
                  this.cupboardService.deleteItems(uidUser, infoCup.uid);
                  infoCup.cant = (infoCup.cant - cant2)*-1;
                  const data: any = {
                    uid: Math.random().toString(36).substring(2),
                    uidUser: uidUser,
                    uidIngredient: uidIngredient,
                    cant: infoCup.cant,
                    uidUnit: uidUnit
                  };
                  this.listSuperUpdate(data);
                  }else {
                    console.log('si resto')
                     infoCup.cant = infoCup.cant - cant2;
                    this.cupboardService.substracItem(infoCup.cant, infoCup.uid);
                  }
                  
                }
                else {
                  const data: any = {
                    uid: Math.random().toString(36).substring(2),
                    uidUser: uidUser,
                    uidIngredient: uidIngredient,
                    cant: cant,
                    uidUnit: uidUnit
                  };
                  this.listSuperUpdate(data);
                //console.log(bander);
                bander = false;
                }
        }   });
   

  }

  private listSuperUpdate(itemList: superList) {
    this.superListService.superListCollection(itemList);
  }
}
