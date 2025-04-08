import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { Module } from '@nestjs/common';
import {
  RepositoryService,
  RepositoryModule,
  SharedService,
} from 'src/repository';

@Module({
  imports: [RepositoryModule],
  providers: [UsersService, UsersResolver, RepositoryService, SharedService],
})
export class UsersModule {}
