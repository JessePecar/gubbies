import { EventEmitter, Injectable } from '@angular/core';
@Injectable({
  providedIn: 'platform',
})
export class NavbarService {
  drodownEvent: EventEmitter<string>;

  constructor() {
    this.drodownEvent = new EventEmitter<string>();
  }

  tiggerEvent(triggerName: string) {
    this.drodownEvent.emit(triggerName);
  }
}
