import { GlobalAlertService } from '@/components/alert/global-alert.service';
import { ContextButtonComponent } from '@/components/buttons';
import { PermissionEnum } from '@/entities/role';
import { UserInfoService } from '@/services';
import { getLocationLine } from '@/utilities';
import { Component, inject, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { User } from '@interfaces/settings/users';

@Component({
  selector: 'user-item',
  imports: [ContextButtonComponent, MatIconModule],
  template: `
    <div class="grid grid-cols-3 p-2">
      <div class="flex flex-col justify-center">
        <div class="flex space-x-2 text-xl items-center">
          <mat-icon fontIcon="account_circle" />
          <p>{{ user().firstName }}</p>
          <p>{{ user().lastName }}</p>
        </div>
        <p class="text-sm pl-8">{{ user().role.name }}</p>
      </div>
      <div>
        <div class="flex space-x-2 flex-wrap">
          <p>{{ user().address?.address1 }}</p>
          @if (user().address?.address2) {
            <p>{{ user().address?.address2 }}</p>
          }
        </div>
        <div class="flex space-x-2 flex-wrap">
          <p>{{ formatAddress(user()) }}</p>
        </div>
      </div>
      <div class="flex justify-between">
        <div>
          <p>{{ createReadablePhoneNumber() }}</p>
        </div>
        <div class="flex justify-center items-center w-10">
          <context-button [options]="userContextMenu" />
        </div>
      </div>
    </div>
  `,
})
export class UserItemComponent {
  globalAlertService = inject(GlobalAlertService);
  private readonly userInfoService = inject(UserInfoService);

  user = input<User>({} as User);
  router = inject(Router);

  onEditUser = () => {
    this.router.navigate(['settings', 'users', 'details'], {
      queryParams: {
        userId: this.user().id,
      },
    });
  };

  onDeactivateUser = () => {
    // TODO: Deactivate the user
  };

  userContextMenu: {
    name: string;
    iconName: string;
    onClickEvent: () => Promise<void> | void;
  }[] = [{ name: 'Edit', iconName: 'edit', onClickEvent: this.onEditUser }];

  createReadablePhoneNumber = () => {
    const { primaryPhone } = this.user();

    if (primaryPhone && primaryPhone.rawDigits) {
      const { rawDigits } = primaryPhone;
      return `(${rawDigits.substring(0, 3)}) ${rawDigits.substring(3, 6)} - ${rawDigits.substring(6, 10)}`;
    }

    return 'N/A';
  };

  constructor() {
    const permissions = this.userInfoService.permissions();
    if (permissions !== undefined) {
      // Find the first index that contains the permission id
      const permissionIndex = permissions?.findIndex(
        p => p.permissionId === PermissionEnum.EDIT_USER
      );

      // If permission id was found and the user is active, allow for quick deactivation
      if (permissionIndex && permissionIndex >= 0 && this.user().isActive) {
        this.userContextMenu.push({
          name: 'Deactivate',
          iconName: 'auto_delete',
          onClickEvent: this.onDeactivateUser,
        });
      }
    }
  }

  formatAddress = ({ address }: User) =>
    address ? getLocationLine(address) : '';
}
