import { Component } from '@angular/core';
import { NavigationDropdownComponent } from './navigation-dropdown.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-inventory-nav-item',
  imports: [NavigationDropdownComponent, RouterLink],
  template: `
    <app-navigation-dropdown dropdownName="inventory">
      <p menuItem class="hover:underline">Inventory</p>
      <div options class="w-full grid grid-cols-3 gap-4">
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
export class InventoryNavItemComponent {
  dropdownOptions = [
    {
      linkTitle: 'Adjustments',
      route: '',
    },
    {
      linkTitle: 'Counts',
      route: '',
    },
    {
      linkTitle: 'Inventory List',
      route: '',
    },
    {
      linkTitle: 'New Item',
      route: '',
    },
  ];
}
