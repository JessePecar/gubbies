import { Component, inject } from '@angular/core';
import { NavigationDropdownComponent } from './navigation-dropdown.component';
import { UserInfoService } from '@/core/services/user';
import { PermissionEnum } from '@/core/types/role';

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
      linkTitle: 'Items',
      route: 'inventory/items/list',
      permission: PermissionEnum.INVENTORY,
    },
    {
      linkTitle: 'Vendors',
      route: 'inventory/vendors/list',
      permission: PermissionEnum.INVENTORY,
    },
    {
      linkTitle: 'Categories',
      route: 'inventory/categories/category-list',
      permission: PermissionEnum.INVENTORY,
    },
  ];
}
