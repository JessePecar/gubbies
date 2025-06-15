import { Routes } from '@angular/router';
import { CreateVendorComponent } from './create';
import { VendorListComponent } from './list';
import { vendorCreateRoutes } from '@/bns-ui/inventory/vendors/create/create-vendor.routes';

export const vendorRoutes: Routes = [
  {
    path: 'create',
    component: CreateVendorComponent,
    children: vendorCreateRoutes,
  },
  {
    path: 'list',
    component: VendorListComponent,
  },
];
