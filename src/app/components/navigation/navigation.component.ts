import { Component, inject } from '@angular/core';
import { UserInfoService } from '../../services';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-navigation',
  imports: [RouterOutlet],
  template: `
    <div class="text-white h-full">
      <div class="w-full h-20 bg-stone-900">
        <div class="flex h-full px-2 py-1 items-end">
          <img alt="Gubbies" class="h-16" src="../../assets/Gubbies.PNG" />
        </div>
      </div>
      <div class="h-3/4">
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
