import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { Observable, of } from 'rxjs';
import { first, map, switchMap } from 'rxjs/operators';
import {  AngularFirestore,AngularFirestoreDocument} from '@angular/fire/firestore';
import { User } from 'src/app/shared/models/user.inteface';
import { RoleValidator } from 'src/app/Validators/Validator_register';
import { infoUser } from 'src/app/shared/models/infoUser.interface';
import { registerUser } from 'src/app/shared/models/registerUser.interface';
import { Router } from '@angular/router';



@Injectable({
  providedIn: 'root'
})
export class AuthService extends RoleValidator{
  private userExist=true;
  public user$: Observable<User>;//variable en la cual se guarda el usuario
  constructor(public afAuth: AngularFireAuth, private afs: AngularFirestore,private router:Router) {
    super();
    this.user$ = this.afAuth.authState.pipe(
      switchMap((user) => {
        if (user) {
          return this.afs.doc<User>(`user/${user.uid}`).valueChanges();
        }
        return of(null);
      })
    );
  }

  //metodo para el login con google
  async loginGoogle(): Promise<User> {
    try {
      const { user } = await this.afAuth.signInWithPopup(
        new auth.GoogleAuthProvider()
      );
      this.exist(user);
      if (this.userExist) {
        console.log("si existo",this.user$);
        return user;
      }
    } catch (error) {
      console.log(error);
    }
  }
  //metodo para el login con facebook
  async loginFacebook(): Promise<User> {
    try {
      const { user } = await this.afAuth.signInWithPopup(
        new auth.FacebookAuthProvider()
      );
      this.exist(user);
      if (this.userExist) {
        console.log("si existo",this.user$);
        return user;
      }
    }
    catch (error) {
      console.log(error);
    }

  }
  //metodo para resetear la contraseña
  async resetPassword(email: string): Promise<void> {
    try {
      return this.afAuth.sendPasswordResetEmail(email);//envio de correo electronico
    } catch (error) {
      console.log(error);
    }
  }

  //metodo para el envio de correo de verificacion
  async sendVerificationEmail(): Promise<void> {
    return (await this.afAuth.currentUser).sendEmailVerification();
  }
  //metodo para el inicio de sesion con correo y contraseña
  async login(email: string, password: string): Promise<User> {
    try {
      const { user } = await this.afAuth.signInWithEmailAndPassword(
        email,
        password
      );
      this.updateUserData(user);
      return user;
    } catch (err) {
      if (err.code == 'auth/user-not-found') {
        window.alert('Este usurio no esta registrado');
     }
     if (err.code =='auth/wrong-password') { 
       window.alert('Contrseña incorrecta!');
     }
     if (err.code == 'auth/user-disabled') {
       window.alert('Estas baneado');
     }
    }
  }

  //metodo de registrado mediante correo y contraseña
  async register(email: string, password: string): Promise<User> {
    try {
      const { user } = await this.afAuth.createUserWithEmailAndPassword(
        email,
        password
      );
      this.updateUserData(user);
      await this.sendVerificationEmail(); 
      this.router.navigate(['/configuracion']); 
      return user;
    } catch (err) {
      if (err.code == 'auth/email-already-in-use') {
        window.alert('Este correo ya ha sido regitrado,intenta con otro'); 
      }
    }
  }

  //metodo para cerrar sesion
  async logout(): Promise<void> {
    try {
      await this.afAuth.signOut();
    } catch (error) {
      console.log(error);
    }
  }

  //ingreso de datos el registro de usuario
  private updateUserData(user: User) {
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(
      `users/${user.uid}`
    );
    const data: User = {
      uid: user.uid,
      email: user.email,
      emailVerified: user.emailVerified
    };
    return userRef.set(data, { merge: true });
  }

  public infoUserData(user: infoUser) {
    const userRef: AngularFirestoreDocument<infoUser> = this.afs.doc(
      `infoUser/${user.uid}`
    );

    const data: infoUser = {
      uid: user.uid,
      uidUser: user.uidUser,
      uidLevel:user.uidLevel,
      uidState: user.uidState,
      points: user.points,
      displayName: user.displayName,
      photoUrl: user.photoUrl
    };
    return userRef.set(data, { merge: true });
  }
  public updateUserDataRegister(user: registerUser) {
    const userRef: AngularFirestoreDocument<registerUser> = this.afs.doc(
      `registerUser/${user.uid}`
    );
    const data: registerUser = {
      uid: user.uid,
      uidUser:user.uidUser
    };

    return userRef.set(data, { merge: true });
  }

  private updateUserDataPremiun(user: User) {
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(
      `premiunCreator/${user.uid}`
    );

    const data: User = {
      uid: user.uid,
      email: user.email,
      emailVerified: user.emailVerified,
      blocked:user.blocked,
    };

    return userRef.set(data, { merge: true });
  }

  async exist(user: User) {
    console.log(user.uid);
   await this.afs.collection('infoUser', ref => ref.where('uidUser','==',user.uid)).valueChanges().subscribe(users => {
      if (users[0]) {
        console.log("sie xisto", users.values.toString());
        this.userExist = true;
      } else {
        this.updateUserData(user);
        this.router.navigate(['/configuracion']);
      }
    });
  }
 }

