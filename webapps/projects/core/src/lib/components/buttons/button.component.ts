import { Component, input, output } from '@angular/core';
import { ButtonDirective } from './button.directive';
import { ButtonColor, ButtonContent, ButtonType } from './button.types';
import { MatIconModule } from '@angular/material/icon';
import { MatRippleModule } from '@angular/material/core';

@Component({
  selector: 'app-button',
  imports: [ButtonDirective, MatIconModule, MatRippleModule],
  template: `
    <button
      matRipple
      [matRippleCentered]="true"
      matRippleColor="#CCCCCC44"
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
  styles: ``,
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
