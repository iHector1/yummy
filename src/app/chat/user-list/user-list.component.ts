import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { roomData } from 'src/app/shared/models/roomData.interface';
import { Input } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
 
  @Input() roomData: roomData;
  @Input() randomSeed: string;
  @Output() seedValue: EventEmitter<string> = new EventEmitter<string>();
  constructor(private afs:AngularFirestore) { }
 
  
  ngOnInit(): void {
  
 
  }
  onClick(): void { 
    this.seedValue.emit(this.randomSeed); 
  }
}
 