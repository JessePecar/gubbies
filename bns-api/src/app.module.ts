import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { UsersModule, RolesModule, AuthModule } from 'src/core';
import { ItemsModule, VendorsModule } from 'src/inventory';
import { ConfigModule } from '@nestjs/config';
import { RepositoryModule, RepositoryService } from 'src/common/repository';
import { SharedModule } from 'src/common/service';

@Module({
  imports: [
    RepositoryModule,
    SharedModule,
    RolesModule,
    ItemsModule,
    UsersModule,
    AuthModule,
    VendorsModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      typePaths: ['./**/*.graphql'],
      path: '',
      subscriptions: {
        'graphql-ws': true,
      },
    }),
  ],
  providers: [RepositoryService],
})
export class AppModule {}
