import { UsersListComponent } from '@/settings/users/list';
import { UserDetailsPage } from './details/user-details.page';
import {
  UserComponent,
  UserCreateComponent,
  usersGuard,
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
      {
        path: '**',
        redirectTo: 'list',
      },
    ],
  },
];
