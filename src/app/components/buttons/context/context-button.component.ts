import { Component, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatRippleModule } from '@angular/material/core';

@Component({
  selector: 'context-button',
  imports: [MatIconModule, MatRippleModule],
  template: `
    <div class="dropdown m-3" tabindex="1">
      <i class="db2" tabindex="1"></i>
      <a
        matRipple
        [matRippleCentered]="true"
        matRippleColor="#44444444"
        class="dropbtn text-primary flex items-center p-1 rounded">
        <mat-icon [fontIcon]="contextIcon()" />
      </a>
      <div class="dropdown-content bg-primary-dark text-primary shadow-lg">
        @for (option of options(); track $index) {
          <a
            matRipple
            matRippleColor="#44444444"
            class="dropdown-item cursor-pointer"
            (click)="option.onClickEvent()">
            <span class="flex space-x-8 items-center">
              @if (option.iconName) {
                <span class="mr-2 h-full flex items-center">
                  <mat-icon
                    style="font-size: 1.25rem;"
                    [fontIcon]="option.iconName" />
                </span>
              }
              {{ option.name }}
            </span>
          </a>
        }
      </div>
    </div>
  `,
  styleUrl: './context-button.component.scss',
})
export class ContextButtonComponent {
  contextIcon = input<string>('more_vert');

  options = input.required<
    {
      name: string;
      iconName?: string;
      onClickEvent: () => void | Promise<void>;
    }[]
  >();
}
