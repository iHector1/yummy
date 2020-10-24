import { Component, OnInit ,ElementRef,ViewChild} from '@angular/core';
import { AuthService} from '../services/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import {DateAdapter} from '@angular/material/core';
import {AngularFireStorage } from '@angular/fire/storage';
import { FormControl, FormGroup,Validators } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { on } from 'process';
import { User } from 'src/app/shared/models/user.inteface';
import { infoUser } from 'src/app/shared/models/infoUser.interface';
import { Router } from '@angular/router';
import { registerUser } from 'src/app/shared/models/registerUser.interface';
import { UsernameValidators} from 'src/app/Validators/usernameValidator';
@Component({
  selector: 'app-confirguracion',
  templateUrl: './confirguracion.component.html',
  styleUrls: ['./confirguracion.component.css']
})
export class ConfirguracionComponent implements OnInit {
  panelOpenState = false;//variable para desplegar las preguntas
  states: Observable<any[]>;//variable para recibir los estados
  category: Observable<any[]>;//variable para recibir las categorias
  level: Observable<any[]>;//Variable para recibir los niveles
  maxDate: Date = new Date(2002, 1, 1);//maximo dia del calendario
  minDate: Date = new Date(1910, 12, 12);//minimo dia para el calendario
  //variables del formulario
  registerForm = new FormGroup({
    nameDisplay: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      UsernameValidators.cannotContainSpace
    ]),
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
  isTaken = false;//variable para saber si ya esta tomado ese nombre
  spaces = false;//variable para saber si tiene espacios el nombre de usuario
  uploadPercent: Observable<number>;//variable de la imagen
  urlImage: Observable<any>;//variable de la direccion uyl
  @ViewChild('imageUser') inputImageUser: ElementRef;
  @ViewChild('idUser') inputUserid: ElementRef;
  public user$: Observable<User> = this.authService.afAuth.user;


  constructor(private afs:AngularFirestore, private _adapter: DateAdapter<any>,private authService: AuthService,private storage: AngularFireStorage,private router:Router
    ) { 
    this.states = afs.collection('state').valueChanges();
    this.category = afs.collection('category').valueChanges();
    this.level = afs.collection('level').valueChanges();
    this._adapter.setLocale('mex');
  } 
  ngOnInit(): void {
  }


  //recuperar la informacion del usuario
  async insert_user() {
    var point;
    let urlphoto;
    var level;
    const { nameDisplay, userState, userCategory, userDate, preg1, preg2
      , preg3, preg4, preg5, preg6, preg7, preg8, preg9, preg10 } = this.registerForm.value;
    if (preg1 != "" || preg2 != "" || preg3 != "" || preg4 != "" || preg5 != "" || preg6 != "" || preg7 != "" || preg8 != "" || preg9 != "" || preg10 != "") {
      var pregt1 = parseInt(preg1);
      var pregt2 = parseInt(preg2);
      var pregt3 = parseInt(preg3);
      var pregt4 = parseInt(preg4);
      var pregt5 = parseInt(preg5);
      var pregt6 = parseInt(preg6);
      var pregt7 = parseInt(preg7);
      var pregt8 = parseInt(preg8);
      var pregt9 = parseInt(preg9);
      var pregt10 = parseInt(preg10);

      var result = pregt1 + pregt2 + pregt3 + pregt4 + pregt5 + pregt6 + pregt7 + pregt8 + pregt9 + pregt10;
      if (result < 5) {
        point = 0;
        level = "mDoNXxyS3hFd5a5MFRml";
        
      }
      if (result > 5 || result < 9) {
        point = 2200;
        level = "NmKowqg5p15ZuQBxPVLB";
      }
      if (result == 10) {
        point = 3200;
        level = "XPskrj6Ci3m6dgVKfpN3";
      }
    } else {
      point = 0;
      level = "mDoNXxyS3hFd5a5MFRml";
    }

    urlphoto = this.inputImageUser.nativeElement.value;
    if (urlphoto == "") {
      urlphoto = "https://firebasestorage.googleapis.com/v0/b/yummy-b4d83.appspot.com/o/photoUser%2Fprofile_fhgc4suqw1?alt=media&token=54ca471c-95a6-42bf-bac1-85b73d07e9ea";
    }
    
    const userInfo: infoUser = {
      uid: this.inputUserid.nativeElement.value,
      uidUser:this.inputUserid.nativeElement.value,
      uidState:userState,
      uidCategory:userCategory,
      displayName: nameDisplay,
      userDate: userDate,
      points:point,
      photoUrl: urlphoto,
      uidLevel:level
    };
    const registerUser: registerUser = {
      uid: this.inputUserid.nativeElement.value,
      uidUser:this.inputUserid.nativeElement.value
    };
    if (!this.isTaken && !this.spaces) {
     this.authService.updateUserDataRegister(registerUser);
     this.authService.infoUserData(userInfo);
     this.router.navigate(['/verificacion']);
    }    
    else {
      console.log("verifica muy bien tus datos de usuario")
    }
  }

  //Envio de la foto de perfil a la base de datos
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
  search($event) {
    const q = $event.target.value;
    this.checkUsername(q);
  }
  //funcion para saber si el nombre de usuario esta repetido 
  checkUsername(q) {
    this.afs.collection('infoUser', ref => ref.where('displayName','==',q)).valueChanges().subscribe(user => {
      if (user[0]) {
        this.isTaken = true;
        window.alert("Escoge otro nombre de usuario");
      } else {
        this.isTaken = false;
      }
    });
  }

  //verifica qu el nombre de usuairo no tenga espacios
  space() {
    if (this.registerForm.controls.nameDisplay.errors.cannotContainSpace) {
      window.alert("El nombre usuario no debe tener espacios");
      this.spaces = true;
    }
    else {
      this.spaces = false;
    }
  }
}
