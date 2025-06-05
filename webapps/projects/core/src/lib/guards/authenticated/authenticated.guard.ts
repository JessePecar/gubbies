import { inject } from '@angular/core';
import { CanActivateChildFn, Router } from '@angular/router';
import { UserInfoService } from '../../services/user-info.service';

export const authenticatedGuard: CanActivateChildFn = () => {
  const userInfoService = inject(UserInfoService);
  if (userInfoService.userInfo() === undefined) {
    inject(Router).navigate(['login']);
  }

  return true;
};
