import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserInfoService } from '../../services/UserInfoService';

export const authenticatedGuard: CanActivateFn = (route, state) => {
  if (inject(UserInfoService).userInfo() === undefined) {
    inject(Router).navigate(["login"]);
  }
  
  return true;
};
