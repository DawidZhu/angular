import { Component } from '@angular/core';
import { MessageService } from '../message.service';
/**
 * ng generate component messages
 */
@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent {
// Angular injects the singleton MessageService into that property 
// when it creates the MessagesComponent.
 // 这个 messageService 属性必须是公共属性，因为你将会在模板中绑定到它 
  constructor(public messageService: MessageService) {}
}
