import { Component, inject, OnInit, signal } from '@angular/core';
import { TableComponent } from '@components/tables/table.component';
import { UsersListService } from './users-list.service';
import { User } from '@interfaces/settings/users';
import { MatIconModule } from '@angular/material/icon';
import { UserItemComponent } from './user-item.component';
import { UserInfoService } from '@/services';
import { Permission } from '@/entities/role';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users-list',
  imports: [TableComponent, MatIconModule, UserItemComponent],
  template: `
    <app-table [toolbarItems]="toolbarItems">
      @if (users().length > 0) {
        @for (user of users(); track $index) {
          <user-item [user]="user" />
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
export class UsersListComponent implements OnInit {
  userListService = inject(UsersListService);
  userInfoService = inject(UserInfoService);
  router = inject(Router);

  loading: boolean = true;

  toolbarItems: {
    icon: string;
    text: string;
    onClick: () => void | Promise<void>;
  }[] = [];

  users = signal<User[]>([]);

  getUsers() {
    this.userListService.getUsers().subscribe(({ data, loading }) => {
      this.users.set(data.users);
      this.loading = loading;
    });
  }

  onCreateUser = async () => {
    await this.router.navigate(['settings/users/details']);
  };

  constructor() {}

  ngOnInit(): void {
    this.getUsers();

    var { role } = this.userInfoService.userInfo() ?? { role: undefined };

    //TODO: Create permission for USER_ADD
    if (role?.permissions.includes(Permission.SETTINGS)) {
      this.toolbarItems.push({
        icon: 'add',
        onClick: this.onCreateUser,
        text: 'Add User',
      });
    }
  }
}
