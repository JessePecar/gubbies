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
  HttpCode,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private jwtService: JwtService,
  ) {}

  @Post()
  @HttpCode(200)
  async authUser(@Body() authRequest: AuthRequest) {
    const userClaims = await this.authService.authUser(authRequest);

    if (userClaims === undefined) {
      return new UnauthorizedException();
    }

    const authClaims = this.getAuthClaimsFromUserClaims(userClaims);

    // Generate token
    const generatedToken = await this.jwtService.signAsync(
      authClaims /** TODO: Setup the token options **/,
    );

    return { token: generatedToken };
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
