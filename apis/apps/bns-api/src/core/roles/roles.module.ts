import { RolesService } from './roles.service';
import { RolesResolver } from './roles.resolver';
import { RepositoryModule, BnsClientService } from '@core/repository';
import { Module } from '@nestjs/common';

@Module({
  imports: [RepositoryModule],
  providers: [RolesService, RolesResolver, BnsClientService],
})
export class RolesModule {}
