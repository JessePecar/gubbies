import { inventoryGuard } from '@/guards/inventory/inventory.guard';
import {
  AdjustmentFormComponent,
  AdjustmentsComponent,
  adjustmentsGuard,
  AdjustmentsListComponent,
} from '@/inventory/adjustments';
import { CategoriesPage, categoriesRoutes } from '@/inventory/categories';
import { InventoryComponent } from '@/inventory/inventory.component';
import {
  ItemCreateComponent,
  ItemDetailsComponent,
  ItemListComponent,
} from '@/inventory/items';
import { VendorsComponent, vendorRoutes } from '@/inventory/vendors';
import { CountsComponent } from '@/pages/inventory/counts.component';
import { Routes } from '@angular/router';

export const inventoryRoutes: Routes = [
  {
    path: 'inventory',
    component: InventoryComponent,
    canActivateChild: [inventoryGuard],
    children: [
      {
        path: 'list',
        component: ItemListComponent,
        canActivate: [],
      },
      {
        path: 'details',
        component: ItemDetailsComponent,
        canActivate: [],
      },
      {
        path: 'create',
        component: ItemCreateComponent,
        canActivate: [], //TODO: Add the item create guard
      },
      {
        path: 'adjustments',
        component: AdjustmentsComponent,
        canActivate: [adjustmentsGuard],
        children: [
          {
            path: '',
            component: AdjustmentsListComponent,
          },
          {
            path: 'create',
            component: AdjustmentFormComponent,
          },
        ],
      },
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
