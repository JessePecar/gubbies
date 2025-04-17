import { CanActivateFn } from '@angular/router';
import { UserInfoService } from '../../services';
import { inject } from '@angular/core';
import { PermissionEnum } from '@/entities/role';

export const reportsGuardGuard: CanActivateFn = (route, state) => {
  var { permissions } = inject(UserInfoService);
  if (permissions()?.some(p => p.permissionId === PermissionEnum.REPORTS)) {
    return true;
  }
  return false;
};
