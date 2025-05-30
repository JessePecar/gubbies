import { CategoriesService } from './categories.service';
import { CategoriesResolver } from './categories.resolver';
import { Module } from '@nestjs/common';
import { BnsClientService, BnsRepositoryModule } from '@core/repository';

@Module({
  imports: [BnsRepositoryModule],
  providers: [CategoriesService, CategoriesResolver, BnsClientService],
})
export class CategoriesModule {}
