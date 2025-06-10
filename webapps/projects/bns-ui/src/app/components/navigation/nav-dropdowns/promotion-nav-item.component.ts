import { Component } from '@angular/core';
import { NavigationDropdownComponent } from '@/bns-ui/components/navigation/navigation-dropdown.component';
import { PermissionEnum } from '@/core/types/role';

@Component({
  selector: 'app-promotion-nav-item',
  imports: [NavigationDropdownComponent],
  template: `
    <app-navigation-dropdown
      [dropdownOptions]="dropdownOptions"
      dropdownName="promotions"
      [dropdownPermission]="promotionPermission">
      <p menuItem>Promotions</p>
    </app-navigation-dropdown>
  `,
  styles: ``,
})
export class PromotionNavItemComponent {
  promotionPermission = PermissionEnum.PROMOTIONS;

  dropdownOptions = [
    {
      linkTitle: 'Active Promotions',
      route: '/active-promotion',
    },
    {
      linkTitle: 'Manage Promotions',
      route: '/manage-promotion',
    },
  ];
}
