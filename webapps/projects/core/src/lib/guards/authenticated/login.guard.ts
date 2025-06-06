import { UserInfoService } from '@/core/services/user';
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const loginGuard: CanActivateFn = () => {
  const userInfoService = inject(UserInfoService);
  if (userInfoService.userClaims()) {
    inject(Router).navigate(['']);
    return false;
  }

  return true;
};
