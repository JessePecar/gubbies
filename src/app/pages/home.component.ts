import { Component, inject } from '@angular/core';
import { UserInfoService } from '../services/UserInfoService';
import { ButtonComponent } from "../components/button.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [ButtonComponent],
  template: `
    <p>
      Welcome home!
      <app-button (click)="logout()" text="Log out" />
    </p>
  `,
  styles: ``
})
export class HomeComponent {
  userInfoService: UserInfoService;
  router: Router;

  constructor() {
    this.userInfoService = inject(UserInfoService);
    this.router = inject(Router);
  }

  logout() {
    console.log('Logging out!')
    this.userInfoService.setUser(undefined);
    this.router.navigate(['login']);

  }
}
