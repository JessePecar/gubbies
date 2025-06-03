import { Component, input, signal } from '@angular/core';

@Component({
  selector: 'app-tab',
  imports: [],
  template: `<div></div>`,
  styles: ``,
})
export class TabComponent {
  isActive = signal<boolean>(false);
  title = input<string>('');
  path = input<string>('');
}
