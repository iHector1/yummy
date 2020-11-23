import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatRoutingModule } from './chat-routing.module';
import { ChatComponent } from './chat.component';
import { AngularMaterialModule } from '../Angular_Material/angular_materia.module';
import { ListComponent } from './list/list.component';
import { ChatAreaComponent } from './chat-area/chat-area.component';
import { UserListComponent } from './user-list/user-list.component';
import { ChatRoomComponent } from './chat-area/chat-room/chat-room.component';

@NgModule({
  declarations: [ChatComponent, ListComponent, ChatAreaComponent, UserListComponent, ChatRoomComponent],
  imports: [
    CommonModule,
    ChatRoutingModule,
    AngularMaterialModule
  ]
}) 
export class ChatModule { }
