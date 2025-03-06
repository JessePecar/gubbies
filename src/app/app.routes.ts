import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home.component';
import { LoginComponent } from './login/login.component';
import { authenticatedGuard, loginGuard } from './guards';
import { NavigationComponent } from './components/navigation';
import { InventoryListComponent } from './pages/inventory/inventory-list.component';
import { inventoryGuard } from './guards/inventory/inventory.guard';
import { CountsComponent } from './pages/inventory/counts.component';
import {
  AdjustmentsComponent,
  AdjustmentFormComponent,
  adjustmentsGuard,
  AdjustmentsListComponent,
} from './inventory/adjustments';

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
        component: AdjustmentsComponent,
        canActivateChild: [inventoryGuard],
        children: [
          {
            path: 'list',
            component: InventoryListComponent,
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
