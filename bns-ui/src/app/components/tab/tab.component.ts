import { Component, input, signal } from '@angular/core';

@Component({
  selector: 'app-tab',
  imports: [],
  template: `
    @if (isActive()) {
      <div>
        <ng-content></ng-content>
      </div>
    }
  `,
  styles: ``,
})
export class TabComponent {
  isActive = signal<boolean>(false);
  title = input.required<string>();
}
