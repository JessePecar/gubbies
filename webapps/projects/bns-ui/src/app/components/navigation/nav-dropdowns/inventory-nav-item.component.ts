import { Component } from '@angular/core';
import { PermissionEnum } from '@/core/types/role';
import { NavigationDropdownComponent } from '@/bns-ui/components/navigation/navigation-dropdown.component';
// import { NavigationDropdownComponent } from '@/bns-ui/components/navigation';

@Component({
  selector: 'app-inventory-nav-item',
  imports: [NavigationDropdownComponent],
  template: `
    <app-navigation-dropdown
      dropdownName="inventory"
      [dropdownOptions]="dropdownOptions"
      [dropdownPermission]="inventoryPermission">
      <p>Inventory</p>
    </app-navigation-dropdown>
  `,
  styles: ``,
})
export class InventoryNavItemComponent {
  inventoryPermission = PermissionEnum.INVENTORY;

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
