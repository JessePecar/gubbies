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
        <div class="flex space-x-2 text-xl items-center">
          <mat-icon fontIcon="account_circle" />
          <p>{{ user().firstName }}</p>
          <p>{{ user().lastName }}</p>
        </div>
        <div>
          <p>{{ user().primaryPhone?.rawDigits ?? '' }}</p>
          <div class="grid grid-cols-3">
            <p>{{ user().address?.address1 }}</p>
            <p>{{ user().address?.address1 }}</p>
            <p>{{ user().address?.city }}</p>
            <p>{{ user().address?.state }}</p>
            <p>{{ user().address?.countryCode }}</p>
          </div>
        </div>
        <div class="flex justify-between">
          <div></div>
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
}
