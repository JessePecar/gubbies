import { UserInfoService } from '@/core/services/user';
import { Component, effect, inject, input, untracked } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-callback',
  imports: [],
  template: ` <p>LOADING!!!!!!</p> `,
  styles: ``,
})
export class LoginCallbackComponent {
  userInfoService = inject(UserInfoService);
  router = inject(Router);
  token = input<string>();

  constructor() {
    effect(() => {
      const token = this.token();
      untracked(() => {
        if (token) {
          // TODO: Grab the user claims from the token and then grab the
          // user information after that dynamically
          this.userInfoService.setUser(token);
        }
      });
    });

    effect(() => {
      const userClaims = this.userInfoService.userClaims();
      const router = this.router;
      untracked(() => {
        if (userClaims) {
          // router?.navigate(['home']);
        } else {
          console.warn('Still waiting for claims to be set');
        }
      });
    });
  }
}
