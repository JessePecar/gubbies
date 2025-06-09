import { UserInfoService } from '@/projects/bns-ui/src/app/common/services';
import { Component, effect, inject, input, untracked } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-callback',
  imports: [],
  template: `<div class="absolute top-0 bottom-0 right-0 left-0">
    <div class="h-full w-full flex items-center justify-center">
      <div class="loader"></div>
      <div class="loader"></div>
      <div class="loader"></div>
      <div class="loader"></div>
      <div class="loader"></div>
    </div>
  </div>`,
  styles: `
  .loader {
    background: var(--color-primary-green);
    margin: 10px;
    height: 20px;
    width: 20px;

    box-shadow: 0 0 0 0 rgba(0, 0, 0, 1);
    transform: scale(1);
    animation: pulse 2s infinite;
  }
  `,
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
