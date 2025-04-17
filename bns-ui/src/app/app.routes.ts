import { Routes } from '@angular/router';
import { HomeComponent } from '@/pages/home.component';
import { LoginComponent } from '@/login/login.component';
import { authenticatedGuard, loginGuard } from '@/guards';
import { NavigationComponent } from '@/components/navigation';
import { inventoryGuard } from '@/guards/inventory/inventory.guard';
import { CountsComponent } from '@/pages/inventory/counts.component';
import {
  AdjustmentsComponent,
  AdjustmentFormComponent,
  adjustmentsGuard,
  AdjustmentsListComponent,
} from '@/inventory/adjustments';
import {
  ItemCreateComponent,
  ItemDetailsComponent,
  ItemListComponent,
} from '@/inventory/items';
import { InventoryComponent } from '@/inventory/inventory.component';
import { SettingsPage, settingsGuard } from '@/settings';
import { vendorRoutes, VendorsComponent } from '@/inventory/vendors';
import { usersRoutes } from '@/settings/users';
import { roleRoutes } from '@/settings/roles';

export const routes: Routes = [
  {
    path: '',
    component: NavigationComponent,
    canActivateChild: [authenticatedGuard],
    children: [
      {
        path: '',
        component: HomeComponent,
        canActivate: [authenticatedGuard],
      },
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
        ],
      },
      {
        path: 'settings',
        component: SettingsPage, // Will default to navigating to user's page
        canActivateChild: [settingsGuard],
        children: [...usersRoutes, ...roleRoutes],
      },
    ],
  },
  { path: 'login', canActivate: [loginGuard], component: LoginComponent },
];
