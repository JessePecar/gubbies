import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { UserInfoService } from '../../services';
import { PermissionEnum } from '@/entities/role';

export const promotionsGuardGuard: CanActivateFn = (route, state) => {
  var { permissions } = inject(UserInfoService);
  if (permissions()?.some(p => p.permissionId === PermissionEnum.PROMOTIONS)) {
    return true;
  }

  return false;
};
