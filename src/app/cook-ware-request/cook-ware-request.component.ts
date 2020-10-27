import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormControl, FormGroup } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { firestore } from 'firebase';
import { Observable } from 'rxjs';
import { cookWare } from '../shared/models/cookWare.interface';
import { CookwareService } from './service/cookware.service';

@Component({
  selector: 'app-cook-ware-request',
  templateUrl: './cook-ware-request.component.html',
  styleUrls: ['./cook-ware-request.component.css']
})
export class CookWareRequestComponent implements OnInit {
  dificulty: Observable<any[]>;// Variable para recibir la dificultad de los utensilios
  name: Observable<any[]>;// Variable para recibir el nombre de los utensilios
  request: Observable<any[]>;// Variable para recibir las peticiones
  //variables del formulario
  cookWareForm = new FormGroup({
    cookwareDificulty: new FormControl(''),
    cookwareName: new FormControl(''),
    cookwareRequest: new FormControl('')
  });

  constructor(firestore:AngularFirestore, private storage: AngularFireStorage, private cookWareService:CookwareService) {
    this.dificulty = firestore.collection('levelCookWare').valueChanges();
   }

  ngOnInit(): void {
  }

  async insert_cookware() {
    const { cookwareName, cookwareDificulty, cookwareRequest} = this.cookWareForm.value;
    const id = Math.random().toString(36).substring(2);

    const cookwareInfo: cookWare = {
      uid : id,
      uidLevelCookWare: cookwareDificulty,
      nameCookWare: cookwareName,
      request: 2
    };
    console.log(cookwareInfo);
    this.cookWareService.CookwareData(cookwareInfo);
  }
}
