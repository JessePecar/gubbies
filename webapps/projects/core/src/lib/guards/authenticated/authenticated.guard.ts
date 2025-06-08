import { UserInfoService } from '@/bns-ui/common/services';
import { inject } from '@angular/core';
import { CanActivateChildFn } from '@angular/router';

export const authenticatedGuard: CanActivateChildFn = () => {
  const userInfoService = inject(UserInfoService);
  if (userInfoService.userClaims() === undefined) {
    // Navigate to portal
    const redirectUri = encodeURIComponent('http://localhost:4200');
    window.location.href = `http://localhost:4201?redirectUrl=${redirectUri}&applicationId=2`;
  }

  return true;
};
