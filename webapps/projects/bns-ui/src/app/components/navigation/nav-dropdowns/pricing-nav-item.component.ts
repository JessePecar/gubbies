import { Component } from '@angular/core';
import { NavigationDropdownComponent } from '@/bns-ui/components/navigation/navigation-dropdown.component';
import { PermissionEnum } from '@/core/types/role';

@Component({
  selector: 'app-pricing-nav-item',
  imports: [NavigationDropdownComponent],
  template: `
    <app-navigation-dropdown
      dropdownName="pricing"
      [dropdownOptions]="dropdownOptions"
      [dropdownPermission]="pricingPermission">
      <p menuItem>Pricing</p>
    </app-navigation-dropdown>
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
