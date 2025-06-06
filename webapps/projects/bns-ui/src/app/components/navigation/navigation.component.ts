import { Component, inject } from '@angular/core';
import { UserInfoService } from '@/core/services/user';
import { Router, RouterOutlet } from '@angular/router';
import { NavigationBarComponent } from '@/bns-ui/components/navigation/navigation-bar.component';
import { ProfileNavItemComponent } from '@/bns-ui/components/navigation/profile-nav-item.component';
import { ButtonComponent } from '@/core/components/buttons';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-navigation',
  imports: [
    RouterOutlet,
    NavigationBarComponent,
    ProfileNavItemComponent,
    ButtonComponent,
    MatIconModule,
  ],
  template: `
    <app-navigation-bar
      class="absolute top-0 bottom-0 w-[12rem] border-r border-primary-dark" />
    <div class="absolute top-10 right-0 bottom-0 left-48">
      <router-outlet />
    </div>
    <div
      class="absolute top-0 right-0 h-10 left-48 border-b border-primary-dark flex justify-end items-center pr-4 space-x-8">
      <app-profile-nav-item />

      <!-- TODO: Move this button into context menu under the app-profile-nav-item component -->
      <app-button contentType="full" buttonType="default" (click)="logout()">
        <div class="py-1 flex space-x-2">
          <mat-icon fontIcon="logout" />
        </div>
      </app-button>
    </div>
  `,
  styles: ``,
})
export class NavigationComponent {
  userService = inject(UserInfoService);
  router = inject(Router);

  logout() {
    this.userService.setUser(undefined);
  }
}
