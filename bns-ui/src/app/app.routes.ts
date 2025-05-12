import { Routes } from '@angular/router';
import { HomeComponent } from '@/pages/home.component';
import { LoginComponent } from '@/login/login.component';
import { authenticatedGuard, loginGuard } from '@/guards';
import { NavigationComponent } from '@/components/navigation';
import { SettingsPage, settingsGuard } from '@/settings';
import { usersRoutes } from '@/settings/users';
import { roleRoutes } from '@/settings/roles';
import { inventoryRoutes } from '@/inventory';
import { adjustmentRoutes } from '@/inventory/adjustments';

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
      ...inventoryRoutes,
      {
        path: 'settings',
        component: SettingsPage, // Will default to navigating to user's page
        canActivateChild: [settingsGuard],
        children: [...usersRoutes, ...roleRoutes],
      },
      ...adjustmentRoutes,
    ],
  },
  { path: 'login', canActivate: [loginGuard], component: LoginComponent },
];
