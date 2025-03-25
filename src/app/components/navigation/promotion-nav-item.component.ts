import { Component } from '@angular/core';
import { NavigationDropdownComponentV2 } from './navigation-dropdown.componentV2';
import { RouterLink } from '@angular/router';
import { PermissionEnum } from '@/entities/role';

@Component({
  selector: 'app-promotion-nav-item',
  imports: [NavigationDropdownComponentV2],
  template: `
    <app-navigation-dropdownv2
      [dropdownOptions]="dropdownOptions"
      dropdownName="promotions"
      [dropdownPermission]="promotionPermission">
      <p menuItem class="hover:underline">Promotions</p>
    </app-navigation-dropdownv2>
  `,
  styles: ``,
})
export class PromotionNavItemComponent {
  promotionPermission = PermissionEnum.PROMOTIONS;

  dropdownOptions = [
    {
      linkTitle: 'Active Promotions',
      route: '',
    },
    {
      linkTitle: 'Manage Promotions',
      route: '',
    },
  ];
}
