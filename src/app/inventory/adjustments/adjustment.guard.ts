import { inject } from '@angular/core';
import { CanActivateChildFn } from '@angular/router';
import { UserInfoService } from '../../services';
import { Permission } from '../../entities/role';

export const adjustmentsGuard: CanActivateChildFn = (route, state) => {
  var { userInfo } = inject(UserInfoService);
  if (
    userInfo() &&
    userInfo()?.role?.permissions.includes(Permission.INVENTORY_ADJUSTMENTS)
  ) {
    return true;
  }

  return false;
};
