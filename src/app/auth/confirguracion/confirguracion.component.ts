import { Component, OnInit ,ElementRef,ViewChild} from '@angular/core';
import { AuthService} from '../services/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import {DateAdapter} from '@angular/material/core';
import {AngularFireStorage } from '@angular/fire/storage';
import { FormControl, FormGroup } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { on } from 'process';
import { User } from 'src/app/shared/models/user.inteface';
import { infoUser } from 'src/app/shared/models/infoUser.interface';
@Component({
  selector: 'app-confirguracion',
  templateUrl: './confirguracion.component.html',
  styleUrls: ['./confirguracion.component.css']
})
export class ConfirguracionComponent implements OnInit {
  panelOpenState = false;//variable para desplegar las preguntas
  states: Observable<any[]>;//c¿variable para recibir los estados
  category: Observable<any[]>;//variable para recibir las categorias
  level: Observable<any[]>;//Variable para recibir los niveles
  maxDate: Date = new Date(2002, 1, 1);//maximo dia del calendario
  minDate: Date = new Date(1910, 12, 12);//minimo dia para el calendario
  //variables del formulario
  registerForm = new FormGroup({
    nameDisplay: new FormControl(''),
    userState: new FormControl(''),
    userCategory: new FormControl(''),
    userDate: new FormControl(''),
    preg1: new FormControl(''),
    preg2: new FormControl(''),
    preg3: new FormControl(''),
    preg4: new FormControl(''),
    preg5: new FormControl(''),
    preg6: new FormControl(''),
    preg7: new FormControl(''),
    preg8: new FormControl(''),
    preg9: new FormControl(''),
    preg10: new FormControl('')
  });
 
  uploadPercent: Observable<number>;//variable de la imagen
  urlImage: Observable<any>;//variable de la direccion uyl
  @ViewChild('imageUser') inputImageUser: ElementRef;




  constructor(firestore:AngularFirestore, private _adapter: DateAdapter<any>,private authService: AuthService,private storage: AngularFireStorage) { 
    this.states = firestore.collection('state').valueChanges();
    this.category = firestore.collection('category').valueChanges();
    this.level = firestore.collection('level').valueChanges();
    this._adapter.setLocale('mex');
  } 

  ngOnInit(): void {
  }


  async insert_user() {
    let point 
    const { nameDisplay, userState, userCategory, userDate, preg1, preg2
      , preg3, preg4, preg5, preg6, preg7, preg8, preg9, preg10 } = this.registerForm.value;
    
    let pregt1 = parseInt(preg1);
    let pregt2 = parseInt(preg2);
    let pregt3 = parseInt(preg3);
    let pregt4 = parseInt(preg4);
    let pregt5 = parseInt(preg5);
    let pregt6 = parseInt(preg6);
    let pregt7 = parseInt(preg7);
    let pregt8 = parseInt(preg8);
    let pregt9 = parseInt(preg9);
    let pregt10 = parseInt(preg10);
    let result = pregt1 + pregt2 + pregt3 + pregt4 + pregt5 + pregt6 + pregt7 + pregt8 + pregt9 + pregt10;
    if (result<5) {
      point = 0;

    } else if (result > 5 ||result<9) {
      point = 2200;
    }
    else if (result == 10) {
      point = 3200;
    }
    if (this.inputImageUser.nativeElement.value==null) {
      this.inputImageUser.nativeElement.value = "";
    }
    const userInfo: infoUser = {
      uid: userCategory,
      uidState:userState,
      uidCategory:userCategory,
      displayName: nameDisplay,
      userDate: userDate,
      points:point,
      photoUrl: this.inputImageUser.nativeElement.value
    };
    console.log(userInfo);
  }
 onUpload(e) {
    console.log(e);
    const id = Math.random().toString(36).substring(2);
    const file = e.target.files[0];
    const filePath = `photoUser/profile_${id}`;
    const ref = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);
    this.uploadPercent = task.percentageChanges();
    task.snapshotChanges().pipe(finalize(() => this.urlImage = ref.getDownloadURL())).subscribe();
  }
}
