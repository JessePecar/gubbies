import { inject, Injectable, signal } from '@angular/core';
import { GetUsersService, UserSubscriptionService } from '@/settings/users';
import { User } from '@/interfaces/settings/users';

@Injectable({
  providedIn: 'root',
})
export class UsersListService {
  private readonly userSubscriptionService = inject(UserSubscriptionService);
  private readonly getUsersService = inject(GetUsersService);

  public users = signal<User[]>([]);
  public loading = true;

  getUsers() {
    return this.getUsersService
      .watch()
      .valueChanges.subscribe(({ data, loading }) => {
        this.users.set(data.users);
        this.loading = loading;
      });
  }

  subscribeToChanges() {
    return this.userSubscriptionService.subscribe().subscribe(({ data }) => {
      if (data && data.usersChanged) {
        this.users.update(user => {
          return user.map(u => {
            if (u.id === data.usersChanged.id) {
              return data.usersChanged;
            }
            return u;
          });
        });
      }
    });
  }

  constructor() {
    this.getUsers();

    this.subscribeToChanges();
  }
}
