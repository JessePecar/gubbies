import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserInfoService } from '../../services';

export const loginGuard: CanActivateFn = () => {
  const userInfoService = inject(UserInfoService);
  if (userInfoService.userInfo()) {
    console.log(userInfoService.userInfo());
    inject(Router).navigate(['']);
    return false;
  }

  return true;
};
