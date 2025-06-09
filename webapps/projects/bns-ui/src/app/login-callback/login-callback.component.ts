import { UserInfoService } from '@/projects/bns-ui/src/app/common/services';
import { Component, effect, inject, input, untracked } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-callback',
  imports: [],
  template: ` <p>LOADING!!!!!!</p> `,
  styles: ``,
})
export class LoginCallbackComponent {
  router = inject(Router);
  token = input<string>();

  constructor(private userInfoService: UserInfoService) {
    effect(() => {
      const token = this.token();
      const service = userInfoService;
      untracked(() => {
        if (token && service) {
          // TODO: Grab the user claims from the token and then grab the
          // user information after that dynamically
          service.setUser(token);
        }
      });
    });

    effect(() => {
      const userClaims = userInfoService.userClaims();
      const router = this.router;
      untracked(() => {
        if (userClaims) {
          router?.navigate(['home']);
        } else {
          console.warn('Still waiting for claims to be set');
        }
      });
    });
  }
}
