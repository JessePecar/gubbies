import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChainModule, ChainController } from './chain';
import { StoreModule, StoreController } from './store';
import { RoleModule, RoleController } from './role';
import { UserModule, UserController } from './user';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [ChainModule, StoreModule, RoleModule, UserModule, AuthModule],
  controllers: [
    AppController,
    StoreController,
    ChainController,
    UserController,
    RoleController,
    AuthController,
  ],
  providers: [AppService, AuthService],
})
export class AppModule {}
