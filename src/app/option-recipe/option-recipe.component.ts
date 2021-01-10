import { Inject } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormControl, FormControlName, FormGroup } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/services/auth.service';
import { User } from '../shared/models/user.inteface';
import { UpdateRecipeComponent } from '../update-recipe/update-recipe.component';
import { OptionServiceService } from './service/option-service.service';

@Component({
  selector: 'app-option-recipe',
  templateUrl: './option-recipe.component.html',
  styleUrls: ['./option-recipe.component.css']
})
export class OptionRecipeComponent implements OnInit {
  option: number;
  bander: boolean = true;
  optionForm = new FormGroup({
    coment: new FormControl('')
  });
  uidUser: string;
  nameOption: string;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private router: Router, private afs: AngularFirestore, private auth:AuthService,private optionService: OptionServiceService,private dialog: MatDialog) { 
    this.user$.subscribe(user => {
      this.uidUser = user.uid;
    });
  }
  user$: Observable<User> = this.auth.afAuth.user;
  ngOnInit(): void {
    console.log(this.data);
  }
  firstOption() { 
    this.bander = false;
    this.option = 1;
  }
  secondOption() {
    this.bander = false;
    this.option = 2;
  }
  updateData() {
    this.dialog.open(UpdateRecipeComponent);
  }
  deleteData() {
    this.afs.collection('infoRecipe').doc(this.router.url.slice(8)).delete();
    this.afs.collection('recipe').doc(this.router.url.slice(8)).delete();
  }
  
  optionSubmit() {
    const { coment } = this.optionForm.value;
    if (coment==""||coment==" ") {
      window.alert('Debe llenar el campo');
    } else {
      if (this.option==1) {
        this.nameOption = 'La receta no es coherente';
      } else {
        this.nameOption = 'Contenido inapropiado';
      }
      const data: any = {
        user: this.uidUser,
        coment: coment,
        option: this.nameOption,
        recipe: this.router.url.slice(8)
      };
      console.log(data);
      this.optionService.optionReport(data);
    }
  }

}
