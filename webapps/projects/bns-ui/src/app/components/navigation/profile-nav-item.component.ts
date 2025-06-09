import { Component } from '@angular/core';
import { UserInfoService } from '@/bns-ui/common/services';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-profile-nav-item',
  imports: [MatIconModule],
  template: `
    <div class="pl-2 flex space-x-2 text-stone-800" menuItem>
      <mat-icon fontIcon="account_circle" />
      <p>
        <!-- {{ userInfoService.userInfo()?.firstName }}
        {{ userInfoService.userInfo()?.lastName }} -->
      </p>
    </div>
  `,
  styles: ``,
})
export class ProfileNavItemComponent {
  // userInfoService: UserInfoService;
  // constructor(userInfoService: UserInfoService) {
  //   this.userInfoService = userInfoService;
  // }
}
