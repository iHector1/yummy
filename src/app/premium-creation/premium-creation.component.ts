import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'firebase';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { AuthService } from '../auth/services/auth.service';
import { adPremium } from '../shared/models/adPremium.interface';
import { PremiumService } from './service/premium.service';

@Component({
  selector: 'app-premium-creation',
  templateUrl: './premium-creation.component.html',
  styleUrls: ['./premium-creation.component.css']
})
export class PremiumCreationComponent implements OnInit {
  urlImage: Observable<any>;
  adPremium= new FormGroup({
    message:new FormControl(''),
    cost: new FormControl(''),
    paypalCount:new FormControl('')
  });
  uploadPercent: Observable<number>;
  controlVideo: boolean;
  videoUrl: any;
  uidUser: string;
  urliImage2:any
  @ViewChild('inputVideo') inputVideo: ElementRef;
  @ViewChild('inputImage') inputImage: ElementRef;

  constructor(private afs: AngularFirestore, private authService: AuthService, private storage: AngularFireStorage,private premiumService:PremiumService,private router:Router) {
    this.user$.subscribe(user => {
      this.uidUser = user.uid;
     });
   }
   public user$: Observable<User> = this.authService.afAuth.user;
  ngOnInit(): void {
  }

  create_ad() {
    const { message, cost, paypalCount } = this.adPremium.value;
    const dataAd: adPremium = {
      uid: this.uidUser,
      uidUser: this.uidUser,
      message: message,
      urlVideo: this.inputVideo.nativeElement.value,
      paypalAccount: paypalCount,
      cost: cost,
      image:this.inputImage.nativeElement.value
    };
    this.authService.updateUserDataPremiun(this.uidUser);
    this.premiumService.createAd(dataAd);
    window.alert("Anuncio creado ,Ahora eres Creador Premium");
    this.router.navigate(['/home']);
  }
  onUpload(e) {
   // console.log(e);
    const file = e.target.files[0];
    if (file.size <20000000) {
      const id = Math.random().toString(36).substring(2);
    const filePath = `adPremium/profile_${id}`;
      const ref = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);
    this.uploadPercent = task.percentageChanges();
    task.snapshotChanges().pipe(finalize(() => this.urlImage = ref.getDownloadURL())).subscribe(value => {
      //console.log(this.urlImage);
    });
    this.controlVideo = true;
    } else {
      window.alert("video demasiado grande, intente con otro");
      this.controlVideo = false;
    }
    
  }
  getDuration(e) {
   // console.log(this.urlImage);
    const duration = e.target.duration;
    if (duration>60) {
      this.controlVideo = false;
      //console.log("el video debe de durar menos de un minuto")
    } else {
      this.controlVideo = true;
    }
  }
  onUploadImage(e) {
    // console.log(e);
     const file = e.target.files[0];
     if (file.size <20000000) {
       const id = Math.random().toString(36).substring(2);
     const filePath = `adPremium/profile_${id}`;
       const ref = this.storage.ref(filePath);
     const task = this.storage.upload(filePath, file);
     this.uploadPercent = task.percentageChanges();
     task.snapshotChanges().pipe(finalize(() => this.urliImage2 = ref.getDownloadURL())).subscribe(value => {
       //console.log(this.urlImage);
     });
     this.controlVideo = true;
     } else {
       window.alert("video demasiado grande, intente con otro");
       this.controlVideo = false;
     } 
   }
}
