import { Component } from '@angular/core';
import { NavigationDropdownComponentV2 } from './navigation-dropdown.componentV2';
import { PermissionEnum } from '@/entities/role';

@Component({
  selector: 'app-pricing-nav-item',
  imports: [NavigationDropdownComponentV2],
  template: `
    <app-navigation-dropdownv2
      dropdownName="pricing"
      [dropdownOptions]="dropdownOptions"
      [dropdownPermission]="pricingPermission">
      <p menuItem class="hover:underline">Pricing</p>
    </app-navigation-dropdownv2>
  `,
  styles: ``,
})
export class PricingNavItemComponent {
  pricingPermission = PermissionEnum.PRICING;

  dropdownOptions = [
    {
      linkTitle: 'Item Pricing',
      route: '/pricing/item-list',
    },
    {
      linkTitle: 'Price Buckets',
      route: '/pricing/buckets',
    },
  ];
}
