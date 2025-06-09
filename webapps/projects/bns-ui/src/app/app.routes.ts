import { Routes } from '@angular/router';
import {
  authenticatedAppGuard,
  authenticatedGuard,
  loginGuard,
} from '@/core/guards';
import { NavigationComponent } from '@/bns-ui/components/navigation';
import { SettingsPage } from '@/settings/settings.page';
import { settingsGuard } from '@/settings/settings.guard';
import { usersRoutes } from '@/settings/users';
import { roleRoutes } from '@/settings/roles';
import { inventoryRoutes } from '@/inventory/inventory.routes';
import { storeRoutes } from '@/settings/store';
import { HomeComponent } from '@/bns-ui/home.component';
import { LoginCallbackComponent } from '@/bns-ui/login-callback';

export const routes: Routes = [
  {
    path: '',
    component: NavigationComponent,
    canActivateChild: [authenticatedAppGuard],
    children: [
      {
        path: '',
        component: HomeComponent,
        // canActivate: [authenticatedGuard],
      },
      ...inventoryRoutes,
      {
        path: 'settings',
        component: SettingsPage, // Will default to navigating to user's page
        canActivateChild: [settingsGuard],
        children: [...usersRoutes, ...roleRoutes, ...storeRoutes],
      },
    ],
  },
  {
    path: 'login-callback',
    component: LoginCallbackComponent,
  },
];
