import { Component, OnInit } from '@angular/core';
import {DateAdapter} from '@angular/material/core';
@Component({
  selector: 'app-schedule-recipes',
  templateUrl: './schedule-recipes.component.html',
  styleUrls: ['./schedule-recipes.component.css']
})
export class ScheduleRecipesComponent implements OnInit {

  constructor(private _adapter: DateAdapter<any>) { 
    this._adapter.setLocale('mex');
  }

  ngOnInit(): void {
  }

}
