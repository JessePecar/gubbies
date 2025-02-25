import { Component, inject } from '@angular/core';
import { UserInfoService } from '../services/UserInfoService';
import { ButtonComponent } from '../components/button.component';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-home',
  imports: [ButtonComponent, MatCardModule],
  template: `
    <div class="flex justify-center items-center h-full w-full">
      <!-- This will be here temporarily -->
      <!-- TODO: Search box to look for items in the system -->
      <mat-card class="w-1/2">
        <mat-card-header>
          <div class="p-4">
            <h1>Welcome, {{ getName() }}!</h1>
          </div>
        </mat-card-header>
        <mat-card-footer class="flex justify-end items-end py-2 px-4">
          <app-button
            buttonType="outline"
            (handleClick)="logout()"
            text="Log out" />
        </mat-card-footer>
      </mat-card>
    </div>
  `,
  styles: ``,
})
export class HomeComponent {
  userInfoService: UserInfoService;
  router: Router;

  constructor() {
    this.userInfoService = inject(UserInfoService);
    this.router = inject(Router);
  }

  logout() {
    this.userInfoService.setUser(undefined);
    this.router.navigate(['login']);
  }

  getName() {
    const userInfo = this.userInfoService.userInfo();

    return `${userInfo?.firstName} ${userInfo?.lastName}`;
  }
}
