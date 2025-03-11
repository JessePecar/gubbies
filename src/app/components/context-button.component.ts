import { Component, input } from '@angular/core';
import { MatIconModule, IconOptions } from '@angular/material/icon';
import { MatRippleModule } from '@angular/material/core';

@Component({
  selector: 'context-button',
  imports: [MatIconModule, MatRippleModule],
  template: `
    <div class="dropdown" tabindex="1">
      <i class="db2" tabindex="1"></i>
      <a
        matRipple
        [matRippleCentered]="true"
        matRippleColor="#44444444"
        class="dropbtn flex items-center p-1 rounded">
        <mat-icon fontIcon="more_vert" />
      </a>
      <div class="dropdown-content bg-stone-700 text-grey-200">
        @for (option of options(); track $index) {
          <a
            matRipple
            matRippleColor="#44444444"
            class="dropdown-item"
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
  styles: `
    /* dd container */
    .dropdown {
      position: relative;
      outline: none;
      margin: 10px;
    }

    /* button */
    .dropbtn {
    }

    /* dd content */
    .dropdown .dropdown-content {
      position: absolute;
      top: 50%;
      right: 50%;
      min-width: 10rem;
      z-index: 100000;
      visibility: hidden;
      opacity: 0;
      transition: 0.15s ease-out;
    }
    .dropdown-content .dropdown-item {
      padding: 0.25rem 16px;
      display: block;
      text-decoration: none;
      transition: 0.15s ease-out;
    }
    .dropdown-content .dropdown-item:hover {
      background-image: linear-gradient(rgb(0 0 0/20%) 0 0);
    }

    /* show dd content */
    .dropdown:focus .dropdown-content {
      outline: none;
      transform: translateY(20px);
      visibility: visible;
      opacity: 1;
    }

    .dropbtn:hover,
    .dropdown:focus .dropbtn {
      background-image: linear-gradient(rgb(0 0 0/20%) 0 0);
    }

    /* mask to close menu by clicking on the button */
    .dropdown .db2 {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      opacity: 0;
      cursor: pointer;
      z-index: 10;
      display: none;
    }
    .dropdown:focus .db2 {
      display: inline-block;
    }
    .dropdown .db2:focus .dropdown-content {
      outline: none;
      visibility: hidden;
      opacity: 0;
    }
  `,
})
export class ContextButtonComponent {
  options = input.required<
    {
      name: string;
      iconName?: string;
      onClickEvent: () => void | Promise<void>;
    }[]
  >();
}
