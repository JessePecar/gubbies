import { Component } from '@angular/core';
import { NavigationDropdownComponent } from './navigation-dropdown.component';
import { RouterLink } from '@angular/router';
import { PermissionEnum } from '@/entities/role';

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
