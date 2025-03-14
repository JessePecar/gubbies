import { GlobalAlertService } from '@/components/alert/global-alert.service';
import { ContextButtonComponent } from '@/components/context-button.component';
import { Component, inject, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { User } from '@interfaces/settings/users';

@Component({
  selector: 'user-item',
  imports: [ContextButtonComponent, MatIconModule],
  template: `
    <div
      class="even:bg-stone-900 odd:border odd:border-stone-900 bg-stone-800 border-stone-800 mb-1 rounded">
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
            <p>{{ user().address?.city }},</p>
            <p>{{ user().address?.state }},</p>
            <p>{{ user().address?.countryCode }}</p>
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
    </div>
  `,
})
export class UserItemComponent {
  user = input.required<User>();
  router = inject(Router);
  globalAlertService = inject(GlobalAlertService);

  onEditUser = async () => {
    await this.router.navigate(['settings/users/details'], {
      queryParams: {
        userId: this.user().id,
      },
    });
  };

  userContextMenu = [
    { name: 'Edit', iconName: 'edit', onClickEvent: this.onEditUser },
    //TODO: Check if the user is active, then show Deactivate
    {
      name: 'Deactivate',
      iconName: 'auto_delete',
      onClickEvent: () => {},
    },
  ];

  createReadablePhoneNumber = () => {
    var { primaryPhone } = this.user();

    if (primaryPhone !== undefined && primaryPhone.rawDigits !== undefined) {
      var { rawDigits } = primaryPhone;
      return `(${rawDigits.substring(0, 3)}) ${rawDigits.substring(3, 6)} - ${rawDigits.substring(6, 10)}`;
    }

    return 'N/A';
  };
}
