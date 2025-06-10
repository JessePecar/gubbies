import { UserInfoService } from '@/bns-ui/common/services';
import { inject } from '@angular/core';
import { CanActivateChildFn, CanActivateFn } from '@angular/router';

export const authenticatedAppGuard: CanActivateChildFn = async () => {
  const userInfoService = inject(UserInfoService);
  if (!!!userInfoService.userClaims()) {
    // Navigate to portal
    const redirectUri = encodeURIComponent('http://localhost:4200');
    window.location.href = `http://localhost:4201?redirectUrl=${redirectUri}&applicationId=2`;
  }

  return true;
};

export const authenticatedGuard: CanActivateFn = async () => {
  const userInfoService = inject(UserInfoService);
  if (!!!userInfoService.userClaims()) {
    // Navigate to portal
    const redirectUri = encodeURIComponent('http://localhost:4200');
    window.location.href = `http://localhost:4201?redirectUrl=${redirectUri}&applicationId=2`;
  }

  return true;
};
