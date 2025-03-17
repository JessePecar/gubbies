import { Component, inject } from '@angular/core';
import { NavigationDropdownComponentV2 } from './navigation-dropdown.componentV2';
import { UserInfoService } from '@/services';
import { Permission } from '../../entities/role';

@Component({
  selector: 'app-inventory-nav-item',
  imports: [NavigationDropdownComponentV2],
  template: `
    @if (canViewDropdown) {
      <app-navigation-dropdownv2
        dropdownName="inventory"
        [dropdownOptions]="dropdownOptions">
        <p menuItem class="hover:underline">Inventory</p>
      </app-navigation-dropdownv2>
    }
  `,
  styles: ``,
})
export class InventoryNavItemComponent {
  inventoryPermission = Permission.INVENTORY;

  userInfoService = inject(UserInfoService);

  canViewDropdown = this.userInfoService
    .userInfo()
    ?.role.rolePermissions.find(
      rp => rp.permissionId === this.inventoryPermission
    );

  dropdownOptions = [
    {
      linkTitle: 'Adjustments',
      route: 'inventory/adjustments',
      permission: Permission.INVENTORY_ADJUSTMENTS,
    },
    {
      linkTitle: 'Counts',
      route: 'inventory/counts',
      permission: Permission.INVENTORY_COUNTS,
    },
    {
      linkTitle: 'Inventory List',
      route: 'inventory/list',
      permission: Permission.INVENTORY,
    },
    {
      linkTitle: 'New Item',
      route: 'inventory/adjustments',
      permission: Permission.INVENTORY,
    },
  ];
}
