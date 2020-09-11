import { Component, OnInit } from '@angular/core';

import {MAT_DATE_LOCALE} from '@angular/material/core';
interface States{ 
    value: string;
  }
@Component({
  selector: 'app-confirguracion',
  templateUrl: './confirguracion.component.html',
  styleUrls: ['./confirguracion.component.css'],
  providers:[{ provide: MAT_DATE_LOCALE, useValue: 'ja-JP' }]
})
export class ConfirguracionComponent implements OnInit {
  
  constructor() { } 

  ngOnInit(): void {
  }
  states: States[]=[
    { value: 'Aguascalientes' },{ value: 'Baja California' },{ value: 'Baja California Sur' },
    { value: 'Campeche' },{ value: 'Chiapas' },{ value: 'Chihuahua' },
    { value: 'Coahuila' },{ value: 'Colima' }, {value:'Distrito Federal'},
    {value:'Durango'},{value:'Estado de Mexico'},{value:'Guanajuato'},
    {value:'Guerrero'},{value:'Hidalgo'},{value:'Jalisco'},
    {value:'Michuacán'},{ value: 'Morelos' },{ value: 'Nayarit' },
    {value:'Nuevo León'},{value:'Oaxaca'},{value:'Puebla'},
    {value:'Querétaro'},{value:'Quintana Roo'},{value:'San Luis Potosí'},
    {value:'Sinaloa'},{value:'Sonora'},{value:'Tabasco'},
    {value:'Tamaulipas'},{value:'Tlaxcala'},{value:'Veracruz'},
    { value: 'Yucatán' }, { value: 'Zacatecas' },];
   
}
