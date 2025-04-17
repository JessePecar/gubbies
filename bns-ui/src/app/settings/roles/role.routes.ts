import {
  RoleComponent,
  RoleDetailsComponent,
  roleGuard,
  RoleListComponent,
} from '@/settings/roles';
import { Routes } from '@angular/router';

export const roleRoutes: Routes = [
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
];
