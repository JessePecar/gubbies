import { UnauthorizedException } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';

// TODO: Add public token check to ensure that this request is coming from an expected source
@Resolver('Auth')
export class AuthResolver {
  constructor(
    private jwtService: JwtService,
    private authService: AuthService,
  ) {}

  @Query('login')
  async login(
    @Args('username') username: string,
    @Args('password') password: string,
  ) {
    // Get the user from the Auth Service
    var authedUser = await this.authService.authUser(username, password);

    // If the user didn't exist
    if (!authedUser) {
      throw new UnauthorizedException();
    }

    // Generate the user's token
    var token = await this.jwtService.signAsync(
      {
        sub: authedUser.id,
        roleId: authedUser.roleId,
      },
      // TODO: Add configuration for the token generation
    );

    // Return the token and the user object (this will save an extra call if I already have the information the ui needs)
    return {
      accessToken: token,
      user: authedUser,
    };
  }
}
