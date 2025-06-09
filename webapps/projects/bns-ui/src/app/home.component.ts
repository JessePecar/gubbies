import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  template: `
    <div class="flex justify-center items-center h-full w-full">
      <!-- This will be here temporarily -->
      <!-- TODO: Search box to look for items in the system -->
      <img class="h-64 w-96" src="../assets/logo_primary.png" />
    </div>
  `,
  styles: ``,
})
export class HomeComponent {
  constructor() {}
}
