import {
  ItemInformationComponent,
  ItemLocationComponent,
  ItemPricingComponent,
  ItemVendorsComponent,
} from '@/inventory/items/ui';
import { Routes } from '@angular/router';

export const itemCreateRoutes: Routes = [
  {
    path: 'info',
    component: ItemInformationComponent,
    title: 'Item Information',
  },
  {
    path: 'vendor',
    component: ItemVendorsComponent,
    title: 'Vendor',
  },
  {
    path: 'pricing',
    component: ItemPricingComponent,
    title: 'Pricing',
  },
  {
    path: 'location',
    component: ItemLocationComponent,
    title: 'Location',
  },
  {
    path: '**',
    redirectTo: 'info',
  },
];
