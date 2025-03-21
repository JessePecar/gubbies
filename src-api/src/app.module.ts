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
import {
  RolesModule,
  UsersModule as GQUsersModule,
  ItemsModule as GQItemsModule,
} from './graphql';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    RepositoryModule,
    UsersModule,
    AdjustmentsModule,
    ItemsModule,
    GQItemsModule,
    GQUsersModule,
    RolesModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      typePaths: ['./**/*.graphql'],
      subscriptions: {
        'graphql-ws': true,
      },
    }),
  ],
  controllers: [UsersController, AdjustmentsController, ItemsController],
  providers: [UserService, RepositoryService, AdjustmentsService, ItemsService],
})
export class AppModule {}
