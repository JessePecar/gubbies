import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ItemsModule, VendorsModule, CategoriesModule } from '@bns/inventory';
import { ConfigModule } from '@nestjs/config';
import { BnsRepositoryModule } from '@core/repository';

@Module({
  imports: [
    BnsRepositoryModule,
    ItemsModule,
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
  providers: [],
})
export class AppModule {}
