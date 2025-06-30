import { AuthController, AuthService } from '@auth/auth';
import { AuthRepositoryModule } from '@core/repository';
import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [AuthRepositoryModule],
  providers: [AuthService, AuthController, JwtService],
})
export class AuthModule {}
