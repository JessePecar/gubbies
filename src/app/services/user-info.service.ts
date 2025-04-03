import { AuthTokenService } from '@/login/requests';
import { RoleSubscriptionService } from '@/settings/roles';
import { UserSubscriptionService } from '@/settings/users';
import { Injectable, computed, inject, signal } from '@angular/core';
import { User } from '@interfaces/settings/users';

@Injectable({
  providedIn: 'root',
})
export class UserInfoService {
  private readonly localStorageKey = 'userInfo';
  private readonly authTokenKey = 'access_token';

  private readonly authTokenService = inject(AuthTokenService);

  public userInfo = signal<User | undefined>(undefined);

  public user = computed(() => ({
    userInfo: this.userInfo(),
    role: signal(this.userInfo()?.role),
    permissions: signal(this.userInfo()?.role.rolePermissions),
  }));

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

  setUser(token: string, newUserInfo?: User) {
    this.userInfo.set(newUserInfo);

    // If the token and the user info is valid, then set, otherwise clear the userinfo and token
    if (newUserInfo && token) {
      localStorage.setItem(this.authTokenKey, JSON.stringify(newUserInfo));
    } else {
      localStorage.removeItem(this.authTokenKey);
    }
  }

  getStoredToken() {
    const token = localStorage.getItem(this.authTokenKey);
    if (token) {
      // If token exists, we will go to the api and get the user
      this.authTokenService
        .watch({
          token: token,
        })
        .valueChanges.subscribe(({ data: { auth }, error }) => {
          // If there is an error, or the user object does not exist
          if (error || !auth) {
            // Set userinfo to undefined, which the guard will send back to login
            this.userInfo.set(undefined);
          }
          // No error and the user was authorized based on the token
          else {
            // set the userinfo
            this.userInfo.set(auth);
          }
        });
    }
  }
}
