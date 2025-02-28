import { Component } from '@angular/core';
import { NavigationDropdownComponentV2 } from './navigation-dropdown.componentV2';

@Component({
  selector: 'app-inventory-nav-item',
  imports: [NavigationDropdownComponentV2],
  template: `
    <app-navigation-dropdownv2
      dropdownName="inventory"
      [dropdownOptions]="dropdownOptions">
      <p menuItem class="hover:underline">Inventory</p>
    </app-navigation-dropdownv2>
  `,
  styles: ``,
})
export class InventoryNavItemComponent {
  dropdownOptions = [
    {
      linkTitle: 'Adjustments',
      route: 'inventory/adjustments',
    },
    {
      linkTitle: 'Counts',
      route: 'inventory/counts',
    },
    {
      linkTitle: 'Inventory List',
      route: 'inventory/list',
    },
    {
      linkTitle: 'New Item',
      route: 'inventory/adjustments',
    },
  ];
}
