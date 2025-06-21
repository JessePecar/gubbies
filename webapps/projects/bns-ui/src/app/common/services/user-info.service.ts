import { Role } from '@/models/auth/role';
import { LocalStorageKeys } from '@/core/constants';
import {
  effect,
  inject,
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
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserInfoService {
  public userInfo = signal<User | undefined>(undefined);
  public userClaims = signal<AuthClaims | undefined>(undefined);

  public role = signal<Role | undefined>(undefined);
  public permissions = linkedSignal(() => this.role()?.rolePermissions);

  private readonly router = inject(Router);

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
      // Set the token info
      localStorage.setItem(LocalStorageKeys.access_token, token);
    } else {
      localStorage.clear();
    }
  }

  setSessionId(sessionId: string | undefined) {
    if (sessionId) {
      localStorage.setItem(LocalStorageKeys.session_id, sessionId);
    } else {
      localStorage.removeItem(LocalStorageKeys.session_id);
    }
  }

  private getUser(userId: string) {
    this.userController.getUser(userId)?.subscribe(user => {
      this.userInfo.set(user);
    });
  }

  private getRole(roleId: string) {
    this.roleController.getRole(roleId)?.subscribe(role => {
      this.role.set(role);
    });
  }

  validateUser() {
    const token = localStorage.getItem(LocalStorageKeys.access_token);
    const sessionId = localStorage.getItem(LocalStorageKeys.session_id);
    // If we have a token and the claims are not set, then do the normal validation
    if (token && sessionId && this.userClaims() === undefined) {
      // If token exists, we will go to the api and get the user
      this.authController.validate(token, sessionId)?.subscribe(authClaims => {
        if (authClaims) {
          // Token is valid, we can now get all the user information if we want to grab them
          this.userClaims.set(authClaims);

          this.router.navigate(['']);
          // Set the token info
          localStorage.setItem(LocalStorageKeys.access_token, token);
        } else {
          // Auth claims were invalid, so we will remove the access token from the store
          localStorage.removeItem(LocalStorageKeys.access_token);
        }
      });
    }
  }

  async getStoredToken() {
    const token = localStorage.getItem(LocalStorageKeys.access_token);
    const sessionId = localStorage.getItem(LocalStorageKeys.session_id);

    if (token && sessionId) {
      // If token exists, we will go to the api and get the user
      this.authController.validate(token, sessionId)?.subscribe(authClaims => {
        if (authClaims) {
          // Token is valid, we can now get all the user information if we want to grab them
          this.userClaims.set(authClaims);

          // Set the token info
          localStorage.setItem(LocalStorageKeys.access_token, token);
        }
      });
    } else {
      // Auth claims were invalid, so we will remove the access token from the store
      localStorage.removeItem(LocalStorageKeys.access_token);
    }
  }
}
