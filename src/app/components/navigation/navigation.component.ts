import { Component, inject } from '@angular/core';
import { UserInfoService } from '@/services';
import { Router, RouterOutlet } from '@angular/router';
import { NavigationBarComponent } from '@/components/navigation/navigation-bar.component';
import { ProfileNavItemComponent } from '@/components/navigation/profile-nav-item.component';
import { ButtonComponent } from '@/components/buttons/button.component';
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
    <div class="flex h-[95%] w-[100%]">
      <app-navigation-bar class="h-full" />
      <div class="h-full w-full">
        <div
          class="h-10 border-b border-primary-dark flex justify-end items-center pr-4 space-x-8">
          <app-profile-nav-item />

          <!-- TODO: Move this button into context menu under the app-profile-nav-item component -->
          <app-button
            contentType="full"
            buttonType="default"
            (click)="logout()">
            <div class="py-1 flex space-x-2">
              <mat-icon fontIcon="logout" />
            </div>
          </app-button>
        </div>
        <div class="h-full">
          <router-outlet />
        </div>
      </div>
    </div>
  `,
  styles: ``,
})
export class NavigationComponent {
  userService = inject(UserInfoService);
  router = inject(Router);

  logout() {
    this.userService.setUser(undefined, undefined);
    this.router.navigate(['login']);
  }
}
