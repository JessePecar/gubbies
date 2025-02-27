import { Component } from '@angular/core';
import { NavigationDropdownComponent } from './navigation-dropdown.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-reports-nav-item',
  imports: [NavigationDropdownComponent, RouterLink],
  template: `
    <app-navigation-dropdown dropdownName="reports">
      <p menuItem class="hover:underline">Reports</p>
      <div options class="w-full grid grid-cols-2 gap-4">
        @for (cat of reportOptions; track $index) {
          <div>
            <h4 class="text-lg font-bold w-full mb-4">{{ cat.category }}</h4>
            <div class="flex flex-col">
              @for (opt of cat.options; track $index) {
                <a
                  class="w-full hover:bg-stone-800 rounded-sm p-1 cursor-pointer"
                  [routerLink]="opt.route"
                  >{{ opt.optionName }}</a
                >
              }
            </div>
          </div>
        }
      </div>
    </app-navigation-dropdown>
  `,
  styles: ``,
})
export class ReportsNavItemComponent {
  reportOptions = [
    {
      category: 'Inventory',
      options: [
        {
          // The adjustments made in a date range
          optionName: 'Adjustment History',
          route: '',
        },
        // The counts made in a date range
        { optionName: 'Count History', route: '' },
        // The transactions (both counts and adjustments) made in a date range
        { optionName: 'Inventory Transaction History', route: '' },
      ],
    },
    {
      category: 'Pricing',
      options: [
        {
          // The Price changes in a date range
          optionName: 'History',
          route: '',
        },
      ],
    },
    {
      category: 'Promotions',
      options: [
        {
          // Promotional changes in a date range
          optionName: 'History',
          route: '',
        },
        {
          // The number of total uses of the promotions
          optionName: 'Uses',
          route: '',
        },
        {
          // The number of total items on each promotion
          optionName: 'Counts',
          route: '',
        },
      ],
    },
  ];
}
