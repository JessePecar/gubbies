import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserInfoService } from '../../services';

export const loginGuard: CanActivateFn = () => {
  if (inject(UserInfoService).userInfo()) {
    inject(Router).navigate(['']);
  }

  return true;
};
