import { Component } from '@angular/core';
import { NavigationDropdownComponent } from './navigation-dropdown.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-pricing-nav-item',
  imports: [NavigationDropdownComponent, RouterLink],
  template: `
    <app-navigation-dropdown dropdownName="pricing">
      <p menuItem class="hover:underline">Pricing</p>
      <div options class="w-full grid grid-cols-2 gap-4">
        @for (opt of dropdownOptions; track $index) {
          <a
            [routerLink]="opt.route"
            class="w-full hover:bg-stone-800 rounded-sm p-1 cursor-pointer"
            >{{ opt.linkTitle }}</a
          >
        }
      </div>
    </app-navigation-dropdown>
  `,
  styles: ``,
})
export class PricingNavItemComponent {
  dropdownOptions = [
    {
      linkTitle: 'Item Pricing',
      route: '',
    },
    {
      linkTitle: 'Price Buckets',
      route: '',
    },
  ];
}
