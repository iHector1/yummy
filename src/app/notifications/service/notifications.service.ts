import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { stream } from 'src/app/shared/models/stream.inteface';

@Injectable({   
  providedIn: 'root'
})
export class NotificationsService {

  constructor(private afs: AngularFirestore) { }

  sendEmailFollower(uidProfile,currentuid) { 
    this.afs.collection('users', ref => ref.where('uid', '==', uidProfile)).valueChanges().subscribe(user1 => {
      if (user1[0]) {
        const user: any = user1[0];
        const email1 = user.email;
        this.afs.collection('mail').add({
            uidUser:user.uid,
            to: email1,
            message: {
              subject: 'Nuevo Seguidor',
              html:`Tienes un nuevo seguidor !,<a href='https://recetasonlineyummy.com/usuario/${currentuid}'>click aqui</a>`
            }
          })
      }
    })
  }

  sendEmailComment(uidRecipe) {
   // console.log('si envio 1');
    let use1 = true;
    this.afs.collection('infoRecipe', ref => ref.where('uid', '==', uidRecipe)).valueChanges().subscribe(recipe => {
      if (recipe[0]) {
        const recipes: any = recipe[0];
   // console.log('si envio 2');
        this.afs.collection('users', ref => ref.where('uid', '==', recipes.uidUser)).valueChanges().subscribe(user => {
          if (user[0]) {
            const user1: any = user[0];
         //   console.log('si envio 3');
            if (use1==true) {
              this.afs.collection('mail').add({
            uidUser:user1.uid,
            to: user1.email,
            message: {
              subject: 'Nuevo Comentario',
              html: `Tienes un nuevo comentario en tu receta!<a href='https://recetasonlineyummy.com/receta/${uidRecipe}'>click aqui</a>`
            }
              })
              use1 = false;
            }
            
          }
        })
      }
    })
  }

  senEmailHelp(uidRecipe) {
    let use1 = true;
    this.afs.collection('infoRecipe', ref => ref.where('uid', '==', uidRecipe)).valueChanges().subscribe(recipe => {
      if (recipe[0]) {
        const recipes: any = recipe[0];
   // console.log('si envio 2');
        this.afs.collection('users', ref => ref.where('uid', '==', recipes.uidUser)).valueChanges().subscribe(user => {
          if (user[0]) {
            const user1: any = user[0];
          //  console.log('si envio 3');
            if (use1==true) {
              this.afs.collection('mail').add({
                uidUser:user1.uid,
                to: user1.email,
                message: {
                  subject: 'Alguien Necesita ayuda',
                  html:`Alguien tiene una duda en tu receta!,ayudalo! ,<a href='https://recetasonlineyummy.com/receta/${uidRecipe}'> click aqui </a> `
                  }
                })
                use1 = false;
            }
            
          }
        })
      }
    })
  }

  sendEmailAnswer(uidHelp) {
  //  console.log('entro');
    let bander = true;
    this.afs.collection('help', ref => ref.where('uid', '==', uidHelp)).valueChanges().subscribe(recipe => {
      if (recipe[0]) {
        let recipes: any = recipe[0];
        this.afs.collection('users', ref => ref.where('uid', '==', recipes.uidUser)).valueChanges().subscribe(user => {
          if (user[0]) {
            let infoUser: any = user[0];
            if (bander == true) {
           //  console.log('si funciono pero no se porque no ');
              this.afs.collection('mail').add({
                uidUser:infoUser.uid,
                to: infoUser.email,
                message: {
                  subject: 'Hey Respondieron tu pregunta',
                  html:`Alguien tiene una respuesta para tu pregunta,revisalo!, <a href='https://recetasonlineyummy.com/receta/${recipes.uidRecipe}'>click aqui</a>`
                  }
                })
                bander = false;
            }
          }
        })
      }
    });
  }

  sendEmailRecipe(uidUser) {
    this.afs.collection<any>('follower/'+uidUser+'/users').valueChanges().subscribe(user=>{
           // console.log("hola", uidUser);
            let contact = [];
            user.forEach( ( x ) => {
           //   console.log(x.uid);
              this.emailRecipe(x.uid,uidUser);
              contact.push( x );
            });
     // console.log(contact);
    })
  }

  private emailRecipe(uidUser,recipeUser) {
    let bander = true;
    this.afs.collection('users', ref => ref.where('uid', '==', uidUser)).valueChanges().subscribe(user=>{
      if (user[0]) {
        const infoUser: any = user[0]
        if (bander == true) {
        //  console.log('si funciono pero no se porque no ');
          this.afs.collection('mail').add({
            uidUser:infoUser.uid,
            to: infoUser.email,
            message: {
              subject: 'Nueva receta',
              html:`Tu cocinero favorito subio una nueva receta!,<a href='https://recetasonlineyummy.com/usuario/${recipeUser}'>click aqui</a>`
              }
            })
            bander = false;
        }
      }
    })
  }

  sendEmailStrem(uidUser,info_stream:stream) {
    this.afs.collection<any>('follower/'+uidUser+'/users',ref=>ref.where('userPremium',"==",true)).valueChanges().subscribe(user=>{
     // console.log("hola", uidUser);
      let contact = [];
      user.forEach( ( x ) => {
      //  console.log(x.uid);
        this.emailStream(x.uid,info_stream.uid,info_stream.date);
        contact.push( x );
      });
//console.log(contact);
})
  }

  private emailStream(uidUser,uidStream,dates){
    let bander = true;
    this.afs.collection('users', ref => ref.where('uid', '==', uidUser)).valueChanges().subscribe(user=>{
      if (user[0]) {
        const infoUser: any = user[0]
        if (bander == true) {
      //    console.log('si funciono pero no se porque no ');
          this.afs.collection('mail').add({
            uidUser:infoUser.uid,
            to: infoUser.email,
            message: {
              subject: 'Nuevo stream',
              html:`Nuevo stream de tu cocinero favorito,sera el ${dates.seconds*1000}!,<a href='https://recetasonlineyummy.com/stream/${uidStream}'>click aqui</a>`
              }
            })
            bander = false;
        }
      }
    })
  }
}
