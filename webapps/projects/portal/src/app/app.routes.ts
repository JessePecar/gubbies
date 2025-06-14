import { LoginComponent } from '@/bns-ui/login/login.component';
import { LogoutComponent } from '@/portal/logout';
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'logout',
    component: LogoutComponent
  }
];
