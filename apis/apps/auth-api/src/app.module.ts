import { Module } from '@nestjs/common';
import { ChainModule, ChainController, ChainService } from './chain';
import { StoreModule, StoreController, StoreService } from './store';
import { RoleModule, RoleController, RoleService } from './role';
import { UserModule, UserController, UserService } from './user';
import { AuthController, AuthModule, AuthService } from './auth';
import {
  ApplicationController,
  ApplicationService,
  ApplicationModule,
} from './application';
import { AuthRepositoryModule, AuthClientService } from '@core/repository';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AuthConstants } from '@core/constants';

@Module({
  imports: [
    AuthRepositoryModule,
    ChainModule,
    StoreModule,
    RoleModule,
    UserModule,
    AuthModule,
    ApplicationModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    JwtModule.register({
      global: true,
      secret: AuthConstants.secret,
      signOptions: { expiresIn: '14d' },
    }),
  ],
  controllers: [
    StoreController,
    ChainController,
    UserController,
    RoleController,
    AuthController,
    ApplicationController,
  ],
  providers: [
    ChainService,
    StoreService,
    RoleService,
    UserService,
    AuthService,
    ApplicationService,
    AuthClientService,
  ],
})
export class AppModule {}
