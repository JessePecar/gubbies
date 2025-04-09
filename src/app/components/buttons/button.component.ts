import { Component, input, output } from '@angular/core';
import { ButtonDirective } from './button.directive';
import { ButtonColor, ButtonContent, ButtonType } from './button.types';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-button',
  imports: [ButtonDirective, MatIconModule],
  template: `
    <button
      button
      [variant]="buttonType()"
      [color]="color()"
      [contentType]="contentType()"
      [disabled]="disabled()"
      type="button"
      (click)="handleClick.emit()">
      <div class="flex space-x-2 py-1">
        @if (icon(); as icon) {
          @if (icon) {
            <mat-icon [fontIcon]="icon" />
          }
        }
        {{ text() }}
      </div>
      <ng-content />
    </button>
  `,
  styles: `
    .button {
    }

    .button:hover:enabled {
      background-image: linear-gradient(rgb(194 122 255/40%) 0 0);
    }
  `,
})
export class ButtonComponent {
  disabled = input<boolean>(false);
  text = input<string>('');
  buttonType = input<ButtonType>('default');
  contentType = input<ButtonContent>('min-content');
  color = input<ButtonColor>('primary');
  icon = input<string | undefined>();

  handleClick = output<void>();
}
