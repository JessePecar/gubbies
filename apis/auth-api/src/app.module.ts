import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
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

@Module({
  imports: [
    ChainModule,
    StoreModule,
    RoleModule,
    UserModule,
    AuthModule,
    ApplicationModule,
  ],
  controllers: [
    AppController,
    StoreController,
    ChainController,
    UserController,
    RoleController,
    AuthController,
    ApplicationController,
  ],
  providers: [
    AppService,
    ChainService,
    StoreService,
    RoleService,
    UserService,
    AuthService,
    ApplicationService,
  ],
})
export class AppModule {}
