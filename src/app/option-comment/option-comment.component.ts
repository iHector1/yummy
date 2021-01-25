import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { OptionCommentService } from './service/option-comment.service';

@Component({
  selector: 'app-option-comment',
  templateUrl: './option-comment.component.html',
  styleUrls: ['./option-comment.component.css']
})
export class OptionCommentComponent implements OnInit {
  bander: boolean=true;
  option: number;
  optionForm = new FormGroup({
    coment: new FormControl('')
  });
  nameOption: string;
  uidUser: any;
  dats: any = false;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private optionService:OptionCommentService,private router:Router) {
    console.log(data.uidUser,data.uidComment);
   }

  ngOnInit(): void {
  }
  firstOption() { 
    this.bander = false;
    this.option = 1;
  }
  secondOption() {
    this.bander = false;
    this.option = 2;
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
        user: this.data.uidUser,
        coment: coment,
        option: this.nameOption,
        recipe:this.router.url.slice(8),
        uidComment: this.data.uidComment
      };
      this.optionService.optionReport(data);
      console.log(data);
    }
  }
}
 