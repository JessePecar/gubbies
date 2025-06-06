import { Role } from '@/models/auth/role';
import { LocalStorageKeys } from '@/core/constants';
import { inject, Injectable, linkedSignal, signal } from '@angular/core';
import { User } from '@/models/auth/user';
import { AuthControllerService } from '@/core/requests/auth';
import { AuthClaims } from '@/models/auth';

@Injectable({
  providedIn: 'root',
})
export class UserInfoService {
  public userInfo = signal<User | undefined>(undefined);
  public userClaims = signal<AuthClaims | undefined>(undefined);

  public role = signal<Role | undefined>(undefined);
  public permissions = linkedSignal(() => this.role()?.rolePermissions);

  private readonly authController = inject(AuthControllerService);
  constructor() {
    // roleSubService: RoleSubscriptionService // userSubService: UserSubscription,
    // userSubService.subscribe().subscribe(({ data }) => {
    //   if (
    //     data &&
    //     data.usersChanged &&
    //     data.usersChanged.id === this.userInfo()?.id
    //   ) {
    //     this.userInfo.set(data.usersChanged);
    //   }
    // });
    // roleSubService.subscribe().subscribe(({ data }) => {
    //   if (
    //     data &&
    //     data.roleUpdated &&
    //     data.roleUpdated.id === this.userInfo()?.roleId
    //   ) {
    //     this.userInfo.update(ui => {
    //       // Update the role on the user object
    //       if (ui) {
    //         ui.role = data.roleUpdated;
    //       }
    //       return ui;
    //     });
    //   }
    // });
  }

  setUser(token: string | undefined) {
    if (token) {
      this.authController.validate(token).subscribe(authClaims => {
        if (authClaims) {
          // Token is valid, we can now get all the user information if we want to grab them
          this.userClaims.set(authClaims);

          // TODO: Call the user and role controller for the user and role objects

          // Set the token info
          localStorage.setItem(LocalStorageKeys.access_token, token);
        } else {
          // Auth claims were invalid, so we will remove the access token from the store
          localStorage.removeItem(LocalStorageKeys.access_token);
        }
      });
    } else {
      this.userClaims.set(undefined);
    }
  }

  async getStoredToken() {
    const token = localStorage.getItem(LocalStorageKeys.access_token);
    if (token) {
      // If token exists, we will go to the api and get the user
      this.authController.validate(token).subscribe(authClaims => {
        if (authClaims) {
          // Token is valid, we can now get all the user information if we want to grab them
          this.userClaims.set(authClaims);

          // TODO: Call the user and role controller for the user and role objects

          // Set the token info
          localStorage.setItem(LocalStorageKeys.access_token, token);
        } else {
          // Auth claims were invalid, so we will remove the access token from the store
          localStorage.removeItem(LocalStorageKeys.access_token);
        }
      });
    }
  }
}
