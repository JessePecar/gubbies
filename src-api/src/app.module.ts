import { Module } from '@nestjs/common';
import { UsersModule } from './users/user.module';
import { UsersController } from './users/users.controller';
import { UserService } from './users/user.service';
import { AdjustmentsController } from './adjustments/adjustments.controller';
import { RepositoryService } from './repository/repository.service';
import { RepositoryModule } from './repository/repository.module';

@Module({
  imports: [RepositoryModule, UsersModule],
  controllers: [UsersController, AdjustmentsController],
  providers: [UserService, RepositoryService],
})
export class AppModule {}
