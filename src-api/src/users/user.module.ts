import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UsersController } from './users.controller';
import { RepositoryModule } from 'src/repository/repository.module';
import { RepositoryService } from 'src/repository/repository.service';

@Module({
  imports: [RepositoryModule],
  exports: [],
  providers: [UserService, RepositoryService],
  controllers: [UsersController],
})
export class UsersModule {}
