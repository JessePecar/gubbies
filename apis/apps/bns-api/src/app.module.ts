import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { UsersModule, RolesModule, AuthModule } from '@bns/core';
import { ItemsModule, VendorsModule, CategoriesModule } from '@bns/inventory';
import { ConfigModule } from '@nestjs/config';
import { RepositoryModule, RepositoryService } from '@bns/common/repository';
import { SharedModule } from '@bns/common/service';

@Module({
  imports: [
    RepositoryModule,
    SharedModule,
    RolesModule,
    ItemsModule,
    UsersModule,
    AuthModule,
    VendorsModule,
    CategoriesModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      typePaths: ['./**/*.graphql'],
      path: '/api',
      subscriptions: {
        'graphql-ws': true,
      },
    }),
  ],
  providers: [RepositoryService],
})
export class AppModule {}
