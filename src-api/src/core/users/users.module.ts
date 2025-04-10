import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { Module } from '@nestjs/common';
import { RepositoryService, RepositoryModule } from 'src/common/repository';
import { SharedService } from 'src/common/service';

@Module({
  imports: [RepositoryModule],
  providers: [UsersService, UsersResolver, RepositoryService, SharedService],
})
export class UsersModule {}
