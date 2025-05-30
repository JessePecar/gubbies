import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { Module } from '@nestjs/common';
import { BnsClientService, RepositoryModule } from '@core/repository';
import { SharedService } from '@core/service';

@Module({
  imports: [RepositoryModule],
  providers: [UsersService, UsersResolver, BnsClientService, SharedService],
})
export class UsersModule {}
