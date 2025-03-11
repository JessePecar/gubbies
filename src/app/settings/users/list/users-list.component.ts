import { Component, inject, signal } from '@angular/core';
import { TableComponent } from '../../../components/tables/table.component';
import { UsersListService } from './users-list.service';
import { User } from '@interfaces/settings/users';
import { MatIconModule } from '@angular/material/icon';
import { ContextButtonComponent } from '../../../components/context-button.component';

@Component({
  selector: 'app-users-list',
  imports: [TableComponent, MatIconModule, ContextButtonComponent],
  template: `
    <app-table [toolbarItems]="toobarItems">
      @if (users().length > 0) {
        @for (user of users(); track $index) {
          <div
            class="even:bg-stone-900 odd:border odd:border-stone-900 bg-stone-800 border-stone-800 mb-1">
            <div class="grid grid-cols-3 p-2">
              <div class="flex space-x-2 text-xl items-center">
                <mat-icon fontIcon="account_circle" />
                <p>{{ user.firstName }}</p>
                <p>{{ user.lastName }}</p>
              </div>
              <div>
                <p>Contact Information</p>
              </div>
              <div class="flex justify-between">
                <div></div>
                <div class="flex justify-center items-center w-10">
                  <context-button
                    [clickParams]="user.id"
                    [options]="userContextMenu" />
                </div>
              </div>
            </div>
          </div>
        }
      } @else {
        <div class="flex w-full justify-center items-cetner">
          <p>No users found.</p>
        </div>
      }
    </app-table>
  `,
  styles: ``,
})
export class UsersListComponent {
  userListService = inject(UsersListService);

  //TODO: Check permissions to determine if user has access to options
  userContextMenu = [
    { name: 'Edit', iconName: 'edit', onClickEvent: () => {} },
    { name: 'Deactivate', iconName: 'auto_delete', onClickEvent: () => {} },
  ];

  //TODO: Check if user has access to add another user
  toobarItems = [
    {
      icon: 'add',
      text: 'Add User',
      onClick: () => {},
    },
  ];

  users = signal<User[]>([]);

  getUsers() {
    this.userListService.getUsers().subscribe(res => {
      this.users.set(res.data.users);
    });
  }

  constructor() {
    this.getUsers();
  }
}
