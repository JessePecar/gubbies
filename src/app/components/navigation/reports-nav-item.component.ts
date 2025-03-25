import { Component } from '@angular/core';
import { NavigationDropdownComponentV2 } from './navigation-dropdown.componentV2';
import { PermissionEnum } from '@/entities/role';

@Component({
  selector: 'app-reports-nav-item',
  imports: [NavigationDropdownComponentV2],
  template: `
    <app-navigation-dropdownv2
      dropdownName="reports"
      [dropdownOptions]="dropdownOptions"
      [dropdownPermission]="reportPermission">
      <p menuItem class="hover:underline">Reports</p>
    </app-navigation-dropdownv2>
  `,
  styles: ``,
})
export class ReportsNavItemComponent {
  reportPermission = PermissionEnum.REPORTS;

  dropdownOptions = [
    {
      linkTitle: 'Inventory',
      route: '/reports/inventory',
    },
    {
      linkTitle: 'Pricing',
      route: '/reports/pricing',
    },
    {
      linkTitle: 'Promotions',
      route: '/reports/promotions',
    },
  ];
}
