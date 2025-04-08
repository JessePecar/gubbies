import { Role } from '@/interfaces/settings/roles';
import { AuthTokenService } from '@/login/requests';
import { RoleSubscriptionService } from '@/settings/roles';
import { UserSubscriptionService } from '@/settings/users';
import { LocalStorageKeys } from '@/utilities';
import {
  Injectable,
  computed,
  inject,
  linkedSignal,
  signal,
} from '@angular/core';
import { Router } from '@angular/router';
import { User } from '@interfaces/settings/users';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserInfoService {
  private readonly authTokenService = inject(AuthTokenService);
  private readonly router = inject(Router);

  public userInfo = signal<User | undefined>(undefined);

  role = linkedSignal<Role | undefined>(() => this.userInfo()?.role);
  permissions = linkedSignal(() => this.role()?.rolePermissions);

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

  setUser(token?: string, newUserInfo?: User) {
    this.userInfo.set(newUserInfo);

    // If the token and the user info is valid, then set, otherwise clear the userinfo and token
    if (newUserInfo && token) {
      localStorage.setItem(LocalStorageKeys.access_token, token);
    } else {
      localStorage.removeItem(LocalStorageKeys.access_token);
    }
  }

  async getStoredToken() {
    const token = localStorage.getItem(LocalStorageKeys.access_token);
    if (token) {
      // If token exists, we will go to the api and get the user
      const {
        data: { auth },
        error,
      } = await this.authTokenService
        .watch({
          token: token,
        })
        .result();

      if (error || !auth) {
        // Set userinfo to undefined, which the guard will send back to login
        this.userInfo.set(undefined);
      }
      // No error and the user was authorized based on the token
      else {
        // set the userinfo
        this.userInfo.set(auth);
      }
    }
  }
}
