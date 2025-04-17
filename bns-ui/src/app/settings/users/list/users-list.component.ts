import { Component, inject } from '@angular/core';
import { TableComponent } from '@components/tables/table.component';
import { UsersListService } from './users-list.service';
import { MatIconModule } from '@angular/material/icon';
import { UserItemComponent } from './user-item.component';
import { UserInfoService } from '@/services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users-list',
  imports: [TableComponent, MatIconModule, UserItemComponent],
  template: `
    <div class="h-3/4 flex justify-center items-center">
      <div class="w-3/4 max-h-1/2">
        <app-table [toolbarItems]="toolbarItems">
          @if (userListService.users().length > 0) {
            @for (user of userListService.users(); track $index) {
              <div
                class="even:bg-primary-dark odd:border odd:border-stone-300 bg-primary border-stone-200 mb-1 rounded">
                <user-item [user]="user" />
              </div>
            }
          } @else {
            <div class="flex w-full justify-center items-cetner">
              <p>No users found.</p>
            </div>
          }
        </app-table>
      </div>
    </div>
  `,
  styles: ``,
})
export class UsersListComponent {
  userListService = inject(UsersListService);
  userInfoService = inject(UserInfoService);
  router = inject(Router);

  toolbarItems: {
    icon: string;
    text: string;
    onClick: () => void | Promise<void>;
  }[] = [];

  onCreateUser = async () => {
    await this.router.navigate(['settings/users/create']);
  };

  constructor() {
    this.toolbarItems.push({
      icon: 'add',
      text: 'Add User',
      onClick: this.onCreateUser,
    });
  }
}
