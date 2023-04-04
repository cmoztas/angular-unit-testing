import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {
  messages: string[] = [];

  constructor() {
    // debugger;
  }

  log(message: string): void {
    debugger;
    this.messages.push(message);
  }
}
