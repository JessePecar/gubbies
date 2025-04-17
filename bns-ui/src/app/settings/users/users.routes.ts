import {
  UserComponent,
  UserCreateComponent,
  UserDetailsPage,
  usersGuard,
  UsersListComponent,
} from '@/settings/users';
import { Routes } from '@angular/router';

export const usersRoutes: Routes = [
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
        component: UserDetailsPage,
      },
    ],
  },
];
