import {
  AuthClaims,
  UserClaim,
  AuthClaimKeys,
  AuthRequest,
  AuthService,
} from '@auth/auth';
import {
  Body,
  Controller,
  Get,
  Headers,
  Post,
  UnauthorizedException,
} from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post()
  async authUser(@Body() authRequest: AuthRequest) {
    const userClaims = await this.authService.authUser(authRequest);

    if (userClaims === undefined) {
      return new UnauthorizedException();
    }

    // Generate token
    return 'Some goofy ass token';
  }

  @Get()
  async validateToken(@Headers('Authorization') authHeader?: string) {
    if (!!!authHeader) {
      return new UnauthorizedException();
    }
    let token: string;
    try {
      token = authHeader.split(' ')[1];
    } catch {
      return new UnauthorizedException();
    }

    const userClaims = await this.authService.verifyUser(token);

    if (userClaims === undefined) {
      return new UnauthorizedException();
    }

    return this.getAuthClaimsFromUserClaims(userClaims);
  }

  private getAuthClaimsFromUserClaims(userClaims: UserClaim[]) {
    let authClaims: AuthClaims = {};

    userClaims.forEach((uc) => {
      authClaims[AuthClaimKeys[uc.code]] = uc.value;
    });

    return authClaims;
  }
}
