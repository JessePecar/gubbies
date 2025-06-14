import { Component } from '@angular/core';

@Component({
  selector: 'loader',
  template: `<div class="absolute top-0 bottom-0 right-0 left-0">
    <div class="h-full w-full flex items-center justify-center">
      <div>
        <div class="loader pulse"></div>
      </div>
    </div>
  </div>`,
  styles: `
    /* HTML: <div class="loader"></div> */
    .loader {
      width: 40px;
      aspect-ratio: 1;
      position: relative;
    }
    .loader:before,
    .loader:after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      margin: -8px 0 0 -8px;
      width: 16px;
      aspect-ratio: 1;
      background: var(--color-primary-blue);
      animation:
        l1-1 2s infinite,
        l1-2 0.5s infinite;
    }
    .loader:after {
      background: var(--color-primary-green);
      animation-delay: -1s, 0s;
    }
    @keyframes l1-1 {
      0% {
        top: 0;
        left: 0;
      }
      25% {
        top: 100%;
        left: 0;
      }
      50% {
        top: 100%;
        left: 100%;
      }
      75% {
        top: 0;
        left: 100%;
      }
      100% {
        top: 0;
        left: 0;
      }
    }
    @keyframes l1-2 {
      80%,
      100% {
        transform: rotate(0.5turn);
      }
    }
  `,
})
export class LoaderComponent {}
