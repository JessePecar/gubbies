import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home.component';
import { LoginComponent } from './login/login.component';
import { authenticatedGuard } from './guards';

export const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [authenticatedGuard] },
  { path: 'login', component: LoginComponent },
  // future components
];
