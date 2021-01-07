import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { Router } from '@angular/router';
import { firestore } from 'firebase';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/services/auth.service';
import { cookWare } from '../shared/models/cookWare.interface';
import { User } from '../shared/models/user.inteface';
import { CookwareService } from './service/cookware.service';

@Component({
  selector: 'app-cook-ware-request',
  templateUrl: './cook-ware-request.component.html',
  styleUrls: ['./cook-ware-request.component.css']
})
export class CookWareRequestComponent implements OnInit {

  dificulty: Observable<any[]>;// Variable para recibir la dificultad de los utensilios

  //variables del formulario
  cookWareForm = new FormGroup({
    cookwareDificulty: new FormControl('', [
    ]),
    cookwareName: new FormControl('', [
    ]),
  });

  constructor(firestore:AngularFirestore, private storage: AngularFireStorage, private cookWareService:CookwareService,private authService:AuthService,private router:Router) {
    this.dificulty = firestore.collection('levelCookWare').valueChanges();
   }
  @ViewChild('idUser') inputUserid: ElementRef;
  public user$: Observable<User> = this.authService.afAuth.user;
  ngOnInit(): void {
  }

  async insert_cookware() {
    try {
      const { cookwareName, cookwareDificulty } = this.cookWareForm.value;
      if(cookwareName ==" "){
        window.alert("Por favor que no esten vacios ");
      } else if(cookwareName =="  "){
        window.alert("Por favor que no esten vacios ");
      }
      else if(cookwareName =="   "){
        window.alert("Por favor que no esten vacios ");
      }
      else if(cookwareName =="    "){
        window.alert("Por favor que no esten vacios ");
      }
      else if(cookwareName =="     "){
        window.alert("Por favor que no esten vacios ");
      }
     else {
        const id = Math.random().toString(36).substring(2);
        let cookwareNameC = cookwareName;
        cookwareNameC = this.MaysPrimera(cookwareName);
        const cookwareInfo: cookWare = {
          uid: id,
          uidLevelCookWare: cookwareDificulty,
          nameCookWare: cookwareNameC,
          request: [this.inputUserid.nativeElement.value]
        };
        //console.log(cookwareInfo);
        this.cookWareService.CookwareData(cookwareInfo, this.inputUserid.nativeElement.value);
        this.router.navigate(['/home']);
     }
    }
    catch (error) {
     // console.log(error);
    }
  }

  MaysPrimera(string){
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

}
