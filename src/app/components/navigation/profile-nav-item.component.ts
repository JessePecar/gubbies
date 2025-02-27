import { Component } from '@angular/core';
import { UserInfoService } from '../../services';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-profile-nav-item',
  imports: [MatIconModule],
  template: `
    <div class="flex" menuItem>
      <mat-icon fontIcon="account_circle" />
      <p>
        {{ userInfoService.userInfo()?.firstName }}
        {{ userInfoService.userInfo()?.lastName }}
      </p>
    </div>
  `,
  styles: ``,
})
export class ProfileNavItemComponent {
  userInfoService: UserInfoService;
  constructor(userInfoService: UserInfoService) {
    this.userInfoService = userInfoService;
  }
}
