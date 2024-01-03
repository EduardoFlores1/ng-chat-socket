import { ChatMessage } from './../../models/chat-message.interface';
import { Component, inject } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule
  ],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent {

  private _chatService = inject(ChatService);
  private _route = inject(ActivatedRoute);

  messageInput: string = '';
  userId: string = '';
  messageList: any[] = [];

  constructor() {
  }

  ngOnInit(): void {
    this.userId = this._route.snapshot.params['userId'];
    this._chatService.joinRoom('ABC');
    this.listenerMessage();
  }

  sendMessage() {
    const chatMessage: ChatMessage = {
      message: this.messageInput,
      user: this.userId,
    }
    this._chatService.sendMessage("ABC", chatMessage);
    this.messageInput = '';
  }

  listenerMessage() {
    this._chatService.getMessageSubject().subscribe((message: ChatMessage) => {
      this.messageList.push({
        ...message,
        message_side: message.user === this.userId ? 'sender': 'receiver',
      });
    })
  }

}
