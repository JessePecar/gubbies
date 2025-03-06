import { Module } from '@nestjs/common';
import { UsersModule, UserService, UsersController } from './users';
import {
  AdjustmentsController,
  AdjustmentsService,
  AdjustmentsModule,
} from './adjustments';
import { RepositoryService } from './repository/repository.service';
import { RepositoryModule } from './repository/repository.module';
import { ItemsController, ItemsService, ItemsModule } from './items';

@Module({
  imports: [RepositoryModule, UsersModule, AdjustmentsModule, ItemsModule],
  controllers: [UsersController, AdjustmentsController, ItemsController],
  providers: [UserService, RepositoryService, AdjustmentsService, ItemsService],
})
export class AppModule {}
