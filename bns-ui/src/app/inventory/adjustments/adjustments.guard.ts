import { inject } from '@angular/core';
import { CanActivateChildFn } from '@angular/router';
import { UserInfoService } from '../../services';
import { PermissionEnum } from '@/entities/role';

export const adjustmentsGuard: CanActivateChildFn = (route, state) => {
  var { permissions } = inject(UserInfoService);
  if (
    permissions()?.some(
      p => p.permissionId === PermissionEnum.INVENTORY_ADJUSTMENTS
    )
  ) {
    return true;
  }

  return false;
};
