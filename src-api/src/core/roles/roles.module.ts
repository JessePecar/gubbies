import { RolesService } from './roles.service';
import { RolesResolver } from './roles.resolver';
import { RepositoryModule, RepositoryService } from 'src/common/repository';
import { Module } from '@nestjs/common';

@Module({
  imports: [RepositoryModule],
  providers: [RolesService, RolesResolver, RepositoryService],
})
export class RolesModule {}
