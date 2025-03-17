import { CanActivateChildFn } from '@angular/router';
import { UserInfoService } from '../../services';
import { inject } from '@angular/core';
import { Permission } from '../../entities/role';

export const inventoryGuard: CanActivateChildFn = (route, state) => {
  var { userInfo } = inject(UserInfoService);
  if (
    userInfo() &&
    userInfo()?.role?.rolePermissions.find(
      rp => rp.permissionId === Permission.INVENTORY
    )
  ) {
    return true;
  }

  return false;
};
