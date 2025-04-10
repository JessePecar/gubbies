import { Component, inject, OnInit, signal } from '@angular/core';
import { NavigationDropdownComponent } from './navigation-dropdown.component';
import { UserInfoService } from '@/services';
import { PermissionEnum } from '@/entities/role';
import { NavigationDropdownDirective } from './navigation-dropdown.directive';

@Component({
  selector: 'app-inventory-nav-item',
  imports: [NavigationDropdownComponent],
  template: `
    <app-navigation-dropdown
      dropdownName="inventory"
      [dropdownOptions]="dropdownOptions"
      [dropdownPermission]="inventoryPermission">
      <p menuItem>Inventory</p>
    </app-navigation-dropdown>
  `,
  styles: ``,
})
export class InventoryNavItemComponent {
  inventoryPermission = PermissionEnum.INVENTORY;

  userInfoService = inject(UserInfoService);

  dropdownOptions = [
    {
      linkTitle: 'Adjustments',
      route: 'inventory/adjustments',
      permission: PermissionEnum.INVENTORY_ADJUSTMENTS,
    },
    {
      linkTitle: 'Counts',
      route: 'inventory/counts',
      permission: PermissionEnum.INVENTORY_COUNTS,
    },
    {
      linkTitle: 'Inventory List',
      route: 'inventory/list',
      permission: PermissionEnum.INVENTORY,
    },
    {
      linkTitle: 'Vendors',
      route: 'inventory/vendors/list',
      permission: PermissionEnum.INVENTORY,
    },
  ];
}
