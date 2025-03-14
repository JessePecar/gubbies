import { Component, inject } from '@angular/core';
import { GlobalAlertService } from './global-alert.service';
import { GlobalAlertDirective } from './global-alert.directive';
import { MatIconModule } from '@angular/material/icon';
import { AlertType } from './AlertType';

@Component({
  selector: 'app-global-alert',
  imports: [GlobalAlertDirective, MatIconModule],
  template: `
    <div class="absolute top-0 right-0 w-0">
      @for (alert of globalAlertService.alerts; track $index) {
        <div
          [alertBox]="alert.type"
          class="flex items-center rounded min-h-12 p-1 w-96 ml-[-25rem] mt-2 space-x-2">
          <mat-icon [fontIcon]="getIcon(alert.type)" />
          <p>{{ alert.message }}</p>
        </div>
      }
    </div>
  `,
  styles: ``,
})
export class GlobalAlertComponent {
  globalAlertService = inject(GlobalAlertService);

  getIcon(alertType: AlertType) {
    switch (alertType) {
      case 'success':
        return 'check_circle';
      case 'error':
        return 'error';
      case 'warning':
        return 'warning';
      case 'info':
      default:
        return 'mail';
    }
  }
}
