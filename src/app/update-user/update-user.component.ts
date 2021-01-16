import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { infoUser } from '../shared/models/infoUser.interface';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {
  states: Observable<any>;
  state: string;
  url: string;
  uploadPercent: Observable<number>;
  urlImage: Observable<any>;
  fb: any;
  constructor(private afs: AngularFirestore,private router:Router,private matDialog: MatDialog,private storage: AngularFireStorage) {
    this.states = this.afs.collection('state').valueChanges();
    this.afs.collection('infoUser', ref => ref.where('uid', '==', this.router.url.slice(9))).valueChanges().subscribe(user => {
      if (user[0]) {
        const infoUser: infoUser = user[0];
        this.state = infoUser.uidState;
      } else {
        this.router.navigate(['/no_existe']);
      }
    });
   }

  ngOnInit(): void {
  }
  closeDialog() {
    let dialogRef = this.matDialog.open(UpdateUserComponent);
    dialogRef.close();
  }
  updateState(uidState) {
    this.afs.collection('infoUser').doc(this.router.url.slice(9)).set({ uidState: uidState }, { merge: true });
    window.alert('Esta donde vives cambiado');
  }
  onUpload(e) {
    //console.log(e);
    const id = Math.random().toString(36).substring(2);
    const file = e.target.files[0];
    const filePath = `photoUser/profile_${id}`;
    const ref = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);
    this.uploadPercent = task.percentageChanges();
    task.snapshotChanges().pipe(finalize(() => {
      this.urlImage = ref.getDownloadURL();
      this.urlImage.subscribe(url => {
        if (url) {
          this.fb = url;
        }
        console.log(this.fb);
        this.afs.collection('infoUser').doc(this.router.url.slice(9)).set({ photoUrl: this.fb }, { merge: true });
        window.alert('Foto cambiada');
      });
    })).subscribe(url => {
      if (url) {
        //console.log(url);
        //
      }
    });
    
  }
}
