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
      @default {
        <!-- Flat button / Text button -->
        <button
          matRipple
          [matRippleDisabled]="disabled()"
          matRippleColor="#44444444"
          class="w-full flex hover:bg-stone-700 rounded hover:underline"
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
  styles: ``,
})
export class ButtonComponent {
  disabled = input<boolean>(false);
  text = input<string>('');
  buttonType = input<'outline' | 'raised' | undefined>(undefined);

  handleClick = output<void>();
}
