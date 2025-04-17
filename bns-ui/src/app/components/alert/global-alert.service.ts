import { Injectable } from '@angular/core';
import { AlertType } from './AlertType';

@Injectable({
  providedIn: 'root',
})
export class GlobalAlertService {
  alerts: {
    id: number;
    type: AlertType;
    message: string;
  }[] = [];

  addAlert(
    type: AlertType,
    message: string,
    duration: number /* In milliseconds */
  ) {
    var id = Math.floor(Math.random() * 9999);

    this.alerts.push({
      id,
      type,
      message,
    });

    setTimeout(() => {
      var itemIndex = this.alerts.indexOf({
        id,
        message,
        type,
      });

      this.alerts.splice(itemIndex, 1);
    }, duration);
  }
}
