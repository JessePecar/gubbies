import { CanActivateFn } from '@angular/router';
import { UserInfoService } from '../../services';
import { inject } from '@angular/core';
import { Permission } from '../../entities/role';

export const pricingGuard: CanActivateFn = (route, state) => {
  var { userInfo } = inject(UserInfoService);
  if (userInfo() && userInfo()?.permissions.includes(Permission.PRICING)) {
    return true;
  }

  return false;
};
