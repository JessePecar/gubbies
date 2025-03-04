import { Component, inject } from '@angular/core';
import { UserInfoService } from '../../services';
import { RouterOutlet } from '@angular/router';
import { NavigationBarComponent } from './navigation-bar.component';

@Component({
  selector: 'app-navigation',
  imports: [RouterOutlet, NavigationBarComponent],
  template: `
    <div class="text-white h-full">
      <app-navigation-bar />
      <div class="h-full w-full pl-20">
        <router-outlet />
      </div>
    </div>
  `,
  styles: ``,
})
export class NavigationComponent {
  userService: UserInfoService;
  constructor() {
    this.userService = inject(UserInfoService);
  }
}
