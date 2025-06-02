import { AuthClaims, UserClaim, AuthClaimKeys } from '@auth/auth';
import { Controller } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  private getAuthClaimsFromUserClaims(userClaims: UserClaim[]) {
    let authClaims: AuthClaims = {};

    userClaims.forEach((uc) => {
      authClaims[AuthClaimKeys[uc.code]] = uc.value;
    });

    return authClaims;
  }
}
