import { Inject } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormControl, FormControlName, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-option-recipe',
  templateUrl: './option-recipe.component.html',
  styleUrls: ['./option-recipe.component.css']
})
export class OptionRecipeComponent implements OnInit {
  option: number;
  bander: boolean=true;
  optionForm = new FormGroup({
    coment: new FormControl('')
  });
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private router:Router,private afs:AngularFirestore) { }

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
  delete() {
    this.afs.collection('infoRecipe').doc(this.router.url.slice(8)).delete();
    this.afs.collection('recipe').doc(this.router.url.slice(8)).delete();
  }

  optionSubmit() {
    const { coment } = this.optionForm.value;
    if (coment==""||coment==" ") {
      window.alert('Debe llenar el campo');
    } else {
      console.log('si se logro');
    }
  }

}
