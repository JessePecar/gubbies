import { Component } from '@angular/core';
import { CardComponent } from '../components/card/card.component';
import { BreadcrumbsComponent } from '../components/navigation/breadcrumbs.component';

@Component({
  selector: 'app-home',
  imports: [CardComponent, BreadcrumbsComponent],
  template: `
    <div class="flex justify-center items-center h-full w-full">
      <!-- This will be here temporarily -->
      <!-- TODO: Search box to look for items in the system -->
      <card>
        <div class="p-4">
          <app-breadcrumbs
            baseIcon="home"
            [baseOption]="{ text: 'Base', route: '', active: true }"
            [breadcrumbOptions]="[
              { text: 'Option 1', route: '', active: true },
              { text: 'Option 2', route: '', active: true },
            ]" />
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
