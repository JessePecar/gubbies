import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { UserInfoService } from '../../services';
import { Permission } from '../../entities/role';

export const promotionsGuardGuard: CanActivateFn = (route, state) => {
  var { userInfo } = inject(UserInfoService);
  if (userInfo() && userInfo()?.permissions.includes(Permission.PROMOTIONS)) {
    return true;
  }

  return false;
};
