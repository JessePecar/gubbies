import { CategoriesService } from './categories.service';
import { CategoriesResolver } from './categories.resolver';
import { Module } from '@nestjs/common';
import { BnsClientService, RepositoryModule } from '@core/repository';

@Module({
  imports: [RepositoryModule],
  providers: [CategoriesService, CategoriesResolver, BnsClientService],
})
export class CategoriesModule {}
