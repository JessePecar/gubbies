import {
  AddressFormComponent,
  InformationFormComponent,
  PhoneFormComponent,
} from '@/bns-ui/inventory/vendors/ui';
import { Routes } from '@angular/router';

export const vendorCreateRoutes: Routes = [
  {
    path: 'info',
    component: InformationFormComponent,
    title: 'Vendor Information',
  },
  {
    path: 'address',
    component: AddressFormComponent,
    title: 'Address',
  },
  {
    path: 'phone',
    component: PhoneFormComponent,
    title: 'Phone',
  },
  {
    path: '**',
    redirectTo: 'info',
  },
];
