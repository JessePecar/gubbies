import { inject } from '@angular/core';
import { CanActivateChildFn } from '@angular/router';
import { UserInfoService } from '../../services';
import { PermissionEnum } from '@/entities/role';

export const adjustmentsGuard: CanActivateChildFn = (route, state) => {
  var { userInfo } = inject(UserInfoService);
  if (
    userInfo() &&
    userInfo()?.role?.rolePermissions.find(
      rp => rp.permissionId === PermissionEnum.INVENTORY_ADJUSTMENTS
    )
  ) {
    return true;
  }

  return false;
};
