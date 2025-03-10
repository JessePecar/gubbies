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
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ItemsModule as GQItemsModule } from './graphql/items';

@Module({
  imports: [
    RepositoryModule,
    UsersModule,
    AdjustmentsModule,
    ItemsModule,
    GQItemsModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      typePaths: ['./**/*.graphql'],
    }),
  ],
  controllers: [UsersController, AdjustmentsController, ItemsController],
  providers: [UserService, RepositoryService, AdjustmentsService, ItemsService],
})
export class AppModule {}
