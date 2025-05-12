import { inventoryGuard } from '@/guards/inventory/inventory.guard';
import { adjustmentRoutes } from '@/inventory/adjustments';
import { CategoriesPage, categoriesRoutes } from '@/inventory/categories';
import { InventoryComponent } from '@/inventory/inventory.component';
import { itemRoutes } from '@/inventory/items';
import { VendorsComponent, vendorRoutes } from '@/inventory/vendors';
import { CountsComponent } from '@/pages/inventory/counts.component';
import { Routes } from '@angular/router';

export const inventoryRoutes: Routes = [
  {
    path: 'inventory',
    component: InventoryComponent,
    canActivateChild: [inventoryGuard],
    children: [
      ...itemRoutes,
      ...adjustmentRoutes,
      {
        path: 'counts',
        component: CountsComponent,
        canActivate: [],
      },
      {
        path: 'vendors',
        component: VendorsComponent,
        children: vendorRoutes,
      },
      {
        path: 'categories',
        component: CategoriesPage,
        children: categoriesRoutes,
      },
    ],
  },
];
