import {
  AuthClaims,
  UserClaim,
  AuthClaimKeys,
  AuthRequest,
  AuthService,
} from '@auth/auth';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import {
  Body,
  Controller,
  Get,
  Headers,
  HttpCode,
  HttpException,
  HttpStatus,
  Inject,
  Post,
  Query,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Cache } from 'cache-manager';
import { v4 as uuid } from 'uuid';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private jwtService: JwtService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  // Get the cached key for the login, which will be the token, which will be validated on grab
  @Get('cached')
  async getCachedLogin(@Query('key') key: string) {
    const cachedObject = await this.cacheManager.get<string>(key);

    // Cached object was found, will now validate
    if (cachedObject) {
      const userClaims = await this.authService.verifyUser(cachedObject);

      if (userClaims) {
        return { token: cachedObject };
      }
    }

    return new UnauthorizedException('Cached key is no longer valid');
  }

  @Get('invalidateKey')
  @HttpCode(200)
  async invalidateKey(@Query('key') key: string) {
    const isDeletedSuccess = await this.cacheManager.del(key);

    if (!isDeletedSuccess) {
      return new HttpException(
        'Key was unable to be invalidated',
        HttpStatus.EXPECTATION_FAILED,
      );
    }
  }

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

    // Create the session id and set the token for the value in the cache
    const sessionId = uuid();

    await this.cacheManager.set(sessionId, generatedToken);

    return { sessionId, token: generatedToken };
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
