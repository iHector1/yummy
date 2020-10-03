import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatRoutingModule } from './chat-routing.module';
import { ChatComponent } from './chat.component';
import { HeaderComponent } from './header/header.component';


@NgModule({
  declarations: [ChatComponent, HeaderComponent, UserListComponent],
  imports: [
    CommonModule,
    ChatRoutingModule
  ]
})
export class ChatModule { }
