import { RoleSubscriptionService } from '@/settings/roles';
import { UserSubscriptionService } from '@/settings/users';
import { Injectable, signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { User } from '@interfaces/settings/users';

@Injectable({
  providedIn: 'root',
})
export class UserInfoService {
  private readonly localStorageKey = 'userInfo';
  public userInfo = signal<User | undefined>(undefined);

  constructor(
    userSubService: UserSubscriptionService,
    roleSubService: RoleSubscriptionService
  ) {
    userSubService.subscribe().subscribe(({ data }) => {
      if (
        data &&
        data.usersChanged &&
        data.usersChanged.id === this.userInfo()?.id
      ) {
        this.userInfo.set(data.usersChanged);
      }
    });

    roleSubService.subscribe().subscribe(({ data }) => {
      if (
        data &&
        data.roleUpdated &&
        data.roleUpdated.id === this.userInfo()?.roleId
      ) {
        this.userInfo.update(ui => {
          // Update the role on the user object
          if (ui) {
            ui.role = data.roleUpdated;
          }

          return ui;
        });
      }
    });
  }

  async setUser(newUserInfo?: User) {
    this.userInfo.set(newUserInfo);

    if (newUserInfo) {
      localStorage.setItem(this.localStorageKey, JSON.stringify(newUserInfo));
    } else {
      localStorage.removeItem(this.localStorageKey);
    }
  }

  async setupStore() {
    const storedData = localStorage.getItem(this.localStorageKey);
    if (storedData) {
      const userInfoStore = JSON.parse(storedData);
      if (userInfoStore) {
        this.userInfo.set(userInfoStore);
      } else {
        localStorage.removeItem(this.localStorageKey);
      }
    }

    // TODO: Get the user from the db since this would actually be a token in the future
  }

  onUserChange() {
    return toObservable(this.userInfo);
  }
}
