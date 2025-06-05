import { Component } from '@angular/core';
import { NavigationDropdownComponent } from './navigation-dropdown.component';
import { PermissionEnum } from '@/core/types/role';

@Component({
  selector: 'app-reports-nav-item',
  imports: [NavigationDropdownComponent],
  template: `
    <app-navigation-dropdown
      dropdownName="reports"
      [dropdownOptions]="dropdownOptions"
      [dropdownPermission]="reportPermission">
      <p menuItem>Reports</p>
    </app-navigation-dropdown>
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
