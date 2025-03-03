import { Component, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';

@Component({
  selector: 'app-button',
  imports: [MatButtonModule, MatRippleModule],
  template: `
    @switch (buttonType()) {
      @case ('outline') {
        <button
          matRipple
          [matRippleDisabled]="disabled()"
          matRippleColor="#FFFFFF22"
          class="text-gray-200 disabled:opacity-50 disabled:cursor-default hover:bg-stone-900 cursor-pointer bg-transparent outline-1 outline-gray-200 rounded-full px-4 py-1"
          [disabled]="disabled()"
          type="button"
          (click)="handleClick.emit()">
          @if (text()) {
            {{ text() }}
          } @else {
            <ng-content />
          }
        </button>
      }
      @case ('raised') {
        <button
          mat-raised-button
          [disabled]="disabled"
          (click)="handleClick.emit()">
          @if (text()) {
            {{ text() }}
          } @else {
            <ng-content />
          }
        </button>
      }
      @default {
        <!-- Flat button / Text button -->
        <button
          matRipple
          [matRippleDisabled]="disabled()"
          matRippleColor="#44444444"
          class="w-full flex hover:bg-stone-800 p-2 rounded cursor-pointer hover:underline"
          [disabled]="disabled()"
          type="button"
          (click)="handleClick.emit()">
          @if (text()) {
            {{ text() }}
          } @else {
            <ng-content />
          }
        </button>
      }
    }
  `,
  styles: ``,
})
export class ButtonComponent {
  disabled = input<boolean>(false);
  text = input<string>('');
  buttonType = input<'outline' | 'raised' | undefined>(undefined);

  handleClick = output<void>();
}
