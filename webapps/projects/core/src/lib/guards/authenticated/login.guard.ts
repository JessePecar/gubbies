import { UserInfoService } from '@/bns-ui/common/services';
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const loginGuard: CanActivateFn = () => {
  const userInfoService = inject(UserInfoService);
  if (userInfoService.userClaims()) {
    inject(Router).navigate(['home']);
    return false;
  }

  return true;
};
