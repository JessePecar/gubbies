import { inject } from '@angular/core';
import { CanActivateChildFn, Router } from '@angular/router';
import { UserInfoService } from '../../services/UserInfoService';

export const authenticatedGuard: CanActivateChildFn = () => {
  if (inject(UserInfoService).userInfo() === undefined) {
    inject(Router).navigate(['login']);
  }

  return true;
};
