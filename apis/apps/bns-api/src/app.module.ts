import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { UsersModule, RolesModule, AuthModule } from '@bns/core';
import { ItemsModule, VendorsModule, CategoriesModule } from '@bns/inventory';
import { ConfigModule } from '@nestjs/config';
import { RepositoryModule, BnsClientService } from '@core/repository';

@Module({
  imports: [
    RepositoryModule,
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
  providers: [BnsClientService],
})
export class AppModule {}
