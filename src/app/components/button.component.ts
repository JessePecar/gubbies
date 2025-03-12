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
          class="text-gray-200 disabled:opacity-50 disabled:cursor-default hover:bg-stone-900  bg-transparent outline-1 outline-gray-200 rounded-lg"
          [disabled]="disabled()"
          type="button"
          (click)="handleClick.emit()">
          <div class="px-4 py-1">
            {{ text() }}
          </div>
          <ng-content />
        </button>
      }
      @case ('raised') {
        <button
          matRipple
          [matRippleDisabled]="disabled()"
          matRippleColor="#FFFFFF22"
          class=" text-stone-900 disabled:opacity-50 disabled:cursor-default hover:bg-gray-300 outline-1 bg-gray-200 rounded-lg"
          [disabled]="disabled()"
          (click)="handleClick.emit()">
          <div class="px-4 py-1">
            {{ text() }}
          </div>
          <ng-content />
        </button>
      }
      @case ('text') {
        <button
          matRipple
          [matRippleDisabled]="disabled()"
          matRippleColor="#44444444"
          class="button w-full flex hover:underline"
          [disabled]="disabled()"
          type="button"
          (click)="handleClick.emit()">
          @if (text()) {
            <div class="px-4 py-1">
              {{ text() }}
            </div>
          }
          <ng-content />
        </button>
      }
      @default {
        <!-- Flat button / Rounded Text Button -->
        <button
          matRipple
          [matRippleDisabled]="disabled()"
          matRippleColor="#44444444"
          class="button w-full flex rounded hover:underline"
          [disabled]="disabled()"
          type="button"
          (click)="handleClick.emit()">
          @if (text()) {
            <div class="px-4 py-1">
              {{ text() }}
            </div>
          }
          <ng-content />
        </button>
      }
    }
  `,
  styles: `
    .button {
    }

    .button:hover {
      background-image: linear-gradient(rgb(194 122 255/20%) 0 0);
    }
  `,
})
export class ButtonComponent {
  disabled = input<boolean>(false);
  text = input<string>('');
  buttonType = input<'outline' | 'raised' | 'text' | undefined>(undefined);

  handleClick = output<void>();
}
