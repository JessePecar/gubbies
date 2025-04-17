import { Routes } from '@angular/router';
import { CreateVendorComponent } from './create';
import { VendorListComponent } from './list';

export const vendorRoutes: Routes = [
  {
    path: 'create',
    component: CreateVendorComponent,
  },
  {
    path: 'list',
    component: VendorListComponent,
  },
];
