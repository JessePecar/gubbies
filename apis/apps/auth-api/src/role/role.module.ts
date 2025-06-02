import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { AuthClientService, AuthRepositoryModule } from '@core/repository';
import { RoleController } from '@auth/role/role.controller';

@Module({
  imports: [AuthRepositoryModule],
  providers: [RoleService, RoleController, AuthClientService],
})
export class RoleModule {}
