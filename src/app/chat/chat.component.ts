import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  seedValue: string;

  constructor() { }

  ngOnInit(): void {
  }
  seedData(ev: string): void {
    this.seedValue = ev;
  }
}
 