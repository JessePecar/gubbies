import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home.component';
import { LoginComponent } from './login/login.component';
import { authenticatedGuard, loginGuard } from './guards';
import { NavigationComponent } from './components/navigation';

export const routes: Routes = [
  {
    path: '',
    component: NavigationComponent,
    canActivateChild: [authenticatedGuard],
    children: [
      {
        path: '',
        component: HomeComponent,
        // canActivate: [authenticatedGuard]
      },
    ],
  },
  { path: 'login', canActivate: [loginGuard], component: LoginComponent },
  // future components
];
