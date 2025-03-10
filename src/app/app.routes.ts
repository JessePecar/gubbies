import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home.component';
import { LoginComponent } from './login/login.component';
import { authenticatedGuard, loginGuard } from './guards';
import { NavigationComponent } from './components/navigation';
import { inventoryGuard } from './guards/inventory/inventory.guard';
import { CountsComponent } from './pages/inventory/counts.component';
import {
  AdjustmentsComponent,
  AdjustmentFormComponent,
  adjustmentsGuard,
  AdjustmentsListComponent,
} from './inventory/adjustments';
import { ItemDetailsComponent, ItemListComponent } from './inventory/items';
import { InventoryComponent } from './inventory/inventory.component';

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
        ],
      },
    ],
  },
  { path: 'login', canActivate: [loginGuard], component: LoginComponent },
];
