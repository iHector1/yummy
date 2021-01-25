import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { OptionHelpService } from './service/option-help.service';

@Component({
  selector: 'app-option-help',
  templateUrl: './option-help.component.html',
  styleUrls: ['./option-help.component.css']
})
export class OptionHelpComponent implements OnInit {
  bander: boolean=true;
  option: number;
  optionForm = new FormGroup({
    coment: new FormControl('')
  });
  nameOption: string;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private optionService:OptionHelpService,private router:Router) { }

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
        uidhelp: this.data.uidHelp
      };
      this.optionService.optionReport(data);
      console.log(data);
    }
  }
}
