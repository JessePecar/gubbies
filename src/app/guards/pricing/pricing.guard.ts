import { CanActivateFn } from '@angular/router';
import { UserInfoService } from '../../services';
import { inject } from '@angular/core';
import { PermissionEnum } from '@/entities/role';

export const pricingGuard: CanActivateFn = (route, state) => {
  var { permissions } = inject(UserInfoService);
  if (permissions()?.some(p => p.permissionId === PermissionEnum.PRICING)) {
    return true;
  }

  return false;
};
