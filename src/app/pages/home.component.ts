import { Component } from '@angular/core';
import { CardComponent } from '../components/card/card.component';
import { BreadcrumbsComponent } from '../components/navigation/breadcrumbs.component';

@Component({
  selector: 'app-home',
  imports: [CardComponent],
  template: `
    <div class="flex justify-center items-center h-full w-full">
      <!-- This will be here temporarily -->
      <!-- TODO: Search box to look for items in the system -->
      <card>
        <div class="p-4">
          <p>Welcome to gubbies!</p>
        </div>
      </card>
    </div>
  `,
  styles: ``,
})
export class HomeComponent {
  constructor() {}
}
