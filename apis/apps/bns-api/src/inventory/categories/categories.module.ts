import { CategoriesService } from './categories.service';
import { CategoriesResolver } from './categories.resolver';
import { Module } from '@nestjs/common';
import { RepositoryService, RepositoryModule } from '@bns/common/repository';

@Module({
  imports: [RepositoryModule],
  providers: [CategoriesService, CategoriesResolver, RepositoryService],
})
export class CategoriesModule {}
