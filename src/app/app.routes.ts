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
import { ItemCreateComponent, ItemDetailsComponent, ItemListComponent } from './inventory/items';
import { InventoryComponent } from './inventory/inventory.component';
import {
  UserComponent,
  UserDetailsComponent,
  UsersListComponent,
  UserCreateComponent,
  usersGuard,
} from './settings/users';
import { SettingsComponent, settingsGuard } from './settings';
import {
  RoleComponent,
  roleGuard,
  RoleDetailsComponent,
  RoleListComponent,
} from './settings/roles';

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
        ],
      },
      {
        path: 'settings',
        component: SettingsComponent, // Will default to navigating to user's page
        canActivateChild: [settingsGuard],
        children: [
          {
            path: 'users',
            component: UserComponent,
            canActivateChild: [usersGuard],
            children: [
              { path: 'create', component: UserCreateComponent },
              {
                path: 'list',
                component: UsersListComponent,
              },
              {
                path: 'details',
                component: UserDetailsComponent,
              },
            ],
          },
          {
            path: 'roles',
            component: RoleComponent,
            canActivateChild: [roleGuard],
            children: [
              {
                path: 'list',
                component: RoleListComponent,
              },
              {
                path: 'details',
                component: RoleDetailsComponent,
              },
            ],
          },
        ],
      },
    ],
  },
  { path: 'login', canActivate: [loginGuard], component: LoginComponent },
];
