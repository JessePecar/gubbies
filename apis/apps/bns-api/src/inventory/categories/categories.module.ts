import { CategoriesService } from './categories.service';
import { CategoriesResolver } from './categories.resolver';
import { Module } from '@nestjs/common';
import { BnsClientService, BnsRepositoryModule } from '@core/repository';
import { JwtStrategy } from '@core/strategy';

@Module({
  imports: [BnsRepositoryModule],
  providers: [
    CategoriesService,
    CategoriesResolver,
    BnsClientService,
    JwtStrategy,
  ],
})
export class CategoriesModule {}
