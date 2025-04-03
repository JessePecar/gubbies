import { Module } from '@nestjs/common';
import { RepositoryService } from './repository/repository.service';
import { RepositoryModule } from './repository/repository.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import {
  RolesModule,
  UsersModule as GQUsersModule,
  ItemsModule as GQItemsModule,
  AuthModule,
} from './graphql';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    RepositoryModule,
    GQItemsModule,
    GQUsersModule,
    RolesModule,
    AuthModule,
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
  providers: [RepositoryService],
})
export class AppModule {}
