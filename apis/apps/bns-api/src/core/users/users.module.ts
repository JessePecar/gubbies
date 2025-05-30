import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { Module } from '@nestjs/common';
import { RepositoryService, RepositoryModule } from '@bns/common/repository';
import { SharedService } from '@bns/common/service';

@Module({
  imports: [RepositoryModule],
  providers: [UsersService, UsersResolver, RepositoryService, SharedService],
})
export class UsersModule {}
