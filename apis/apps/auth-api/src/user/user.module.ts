import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthClientService, AuthRepositoryModule } from '@core/repository';
import { UserController } from '@auth/user/user.controller';
import { AuthModule, AuthService } from '@auth/auth';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [AuthRepositoryModule, AuthModule],
  providers: [
    UserService,
    UserController,
    AuthService,
    AuthClientService,
    JwtService,
  ],
})
export class UserModule {}
