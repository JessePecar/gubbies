import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-home',
  imports: [MatCardModule],
  template: `
    <div class="flex justify-center items-center h-full w-full">
      <!-- This will be here temporarily -->
      <!-- TODO: Search box to look for items in the system -->
      <mat-card class="w-1/2 p-4">
        <p>Welcome to gubbies!</p>
      </mat-card>
    </div>
  `,
  styles: ``,
})
export class HomeComponent {
  constructor() {}
}
