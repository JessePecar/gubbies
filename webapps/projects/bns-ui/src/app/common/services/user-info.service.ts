import { Role } from '@/models/auth/role';
import { LocalStorageKeys } from '@/core/constants';
import {
  effect,
  Injectable,
  linkedSignal,
  signal,
  untracked,
} from '@angular/core';
import { User } from '@/models/auth/user';
import {
  AuthControllerService,
  RoleControllerService,
  UserControllerService,
} from '@/core/requests/auth';
import { AuthClaims } from '@/models/auth';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'any',
})
export class UserInfoService {
  public userInfo = signal<User | undefined>(undefined);
  public userClaims = signal<AuthClaims | undefined>(undefined);

  public role = signal<Role | undefined>(undefined);
  public permissions = linkedSignal(() => this.role()?.rolePermissions);

  constructor(
    private readonly authController: AuthControllerService,
    private readonly userController: UserControllerService,
    private readonly roleController: RoleControllerService
  ) {
    effect(() => {
      const userClaims = this.userClaims();
      untracked(() => {
        if (userClaims) {
          // Get the User from the auth db
          if (userClaims.userId) this.getUser(userClaims.userId);

          // Get the role from the auth db
          if (userClaims.roleId) this.getRole(userClaims.roleId);
        }
      });
    });

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
      return this.authController.validate(token).subscribe(authClaims => {
        if (authClaims) {
          // Token is valid, we can now get all the user information if we want to grab them
          this.userClaims.set(authClaims);

          // Set the token info
          localStorage.setItem(LocalStorageKeys.access_token, token);
        } else {
          // Auth claims were invalid, so we will remove the access token from the store
          localStorage.removeItem(LocalStorageKeys.access_token);
        }
      });
    } else {
      this.userClaims.set(undefined);
      return undefined;
    }
  }

  private getUser(userId: string) {
    this.userController.getUser(userId).subscribe(user => {
      this.userInfo.set(user);
    });
  }

  private getRole(roleId: string) {
    this.roleController.getRole(roleId).subscribe(role => {
      this.role.set(role);
    });
  }

  async validateUser() {
    const token = localStorage.getItem(LocalStorageKeys.access_token);
    if (token && this.userClaims() !== undefined) return true;

    // If we have a token and the claims are not set, then do the normal validation
    if (token && this.userClaims() === undefined) {
      // If token exists, we will go to the api and get the user
      const authClaims = await firstValueFrom(
        this.authController.validate(token)
      ).catch(err => {
        console.warn(err);
        return undefined;
      });

      if (authClaims) {
        // Token is valid, we can now get all the user information if we want to grab them
        this.userClaims.set(authClaims);

        // TODO: Call the user and role controller for the user and role objects

        // Set the token info
        localStorage.setItem(LocalStorageKeys.access_token, token);
        return true;
      } else {
        // Auth claims were invalid, so we will remove the access token from the store
        localStorage.removeItem(LocalStorageKeys.access_token);
      }
    }

    return false;
  }

  async getStoredToken() {
    const token = localStorage.getItem(LocalStorageKeys.access_token);

    if (token) {
      // If token exists, we will go to the api and get the user
      const authClaims = await firstValueFrom(
        this.authController.validate(token)
      ).catch(err => {
        console.warn(err);
        return undefined;
      });

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
    }
  }
}
