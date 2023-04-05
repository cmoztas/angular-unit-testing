import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {
  messages: string[] = [];

  log(message: string): void {
    this.messages.push(message);
  }

  clear(): void {
    this.messages = [];
  }
}
