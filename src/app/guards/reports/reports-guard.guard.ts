import { CanActivateFn } from '@angular/router';
import { Permission } from '../../entities/role';
import { UserInfoService } from '../../services';
import { inject } from '@angular/core';

export const reportsGuardGuard: CanActivateFn = (route, state) => {
  var { userInfo } = inject(UserInfoService);
  if (
    userInfo() &&
    userInfo()?.role?.permissions.includes(Permission.REPORTS)
  ) {
    return true;
  }
  return false;
};
