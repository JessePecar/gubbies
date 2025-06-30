import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy, StrategyOptionsWithRequest } from 'passport-jwt';
import { AuthConstants } from 'libs/core/src/constants';
import { AuthClientService } from '@core/repository';
import { AuthUtil } from '@core/utilities';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  private readonly authUtil: AuthUtil;
  constructor(private authService: AuthClientService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: AuthConstants.secret,
    } as StrategyOptionsWithRequest);

    this.authUtil = new AuthUtil();
  }

  async validate(payload: { sub: number; roleId: number }) {
    const claims = await this.authService.userClaim.findMany({
      where: {
        userId: {
          equals: payload.sub,
        },
      },
    });

    if (claims) {
      const userClaims = this.authUtil.getAuthClaimsFromUserClaims(claims);

      return { claims: userClaims };
    }

    return {claims: undefined};
    // throw new UnauthorizedException(
    //   'User does not have appropriate access to this application',
    // );
  }
}
