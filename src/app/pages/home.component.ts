import { Component } from '@angular/core';
import { CardComponent } from '../components/card/card.component';

@Component({
  selector: 'app-home',
  imports: [CardComponent],
  template: `
    <div class="flex justify-center items-center h-full w-full">
      <!-- This will be here temporarily -->
      <!-- TODO: Search box to look for items in the system -->
      <card class="w-1/2 p-4">
        <p>Welcome to gubbies!</p>
      </card>
    </div>
  `,
  styles: ``,
})
export class HomeComponent {
  constructor() {}
}
