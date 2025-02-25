import { Component, inject, input } from '@angular/core';
import { UserInfoService } from '../../services';
import { RouterOutlet } from '@angular/router';
import { UserInfo } from '../../interfaces/user';

@Component({
  selector: 'app-navigation',
  imports: [RouterOutlet],
  template: `
    <p>{{userService.userInfo()}}</p>
    @if(userService.userInfo() === undefined) {
      <!-- Don't show the navigation menu -->
      <router-outlet />
    } @else {
      <!-- Show the navigation menu -->
       <div class="text-white">
         <router-outlet />
        </div>
    }
  `,
  styles: ``
})
export class NavigationComponent {
  userService: UserInfoService;
  constructor() {
    this.userService = inject(UserInfoService);
  }

}
