import { Injectable } from '@angular/core';
/**
 * ng generate service message
 */
@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor() { }
  //定义数组，并赋值
  messages: string[] = [];
  // 添加message
  add(message: string){
    this.messages.push(message);
  }
 //清空 message
  clear() {
    this.messages = [];
  }

}
