import { RepositoryModule, BnsClientService } from '@core/repository';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthConstants } from '@core/constants';
import { JwtStrategy } from '@core/strategy';

@Module({
  imports: [
    PassportModule,
    RepositoryModule,
    JwtModule.register({
      global: true,
      secret: AuthConstants.secret,
      signOptions: { expiresIn: '7d' },
      // TODO: Update this to have a shorter lifespan and have a refresh token returned as well with a longer lifespan
    }),
  ],
  providers: [AuthService, AuthResolver, BnsClientService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
