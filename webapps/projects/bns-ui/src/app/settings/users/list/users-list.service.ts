import { inject, Injectable, signal } from '@angular/core';
import { GetUsersQuery, UserSubscription } from '@/settings/users';
import { User } from '@/models/auth/user';

@Injectable({
  providedIn: 'root',
})
export class UsersListService {
  private readonly userSubscription = inject(UserSubscription);
  private readonly getUsersQuery = inject(GetUsersQuery);

  public users = signal<User[]>([]);
  public loading = true;

  getUsers() {
    return this.getUsersQuery
      .watch()
      .valueChanges.subscribe(({ data, loading }) => {
        this.users.set(data.users);
        this.loading = loading;
      });
  }

  subscribeToChanges() {
    return this.userSubscription.subscribe().subscribe(({ data }) => {
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
