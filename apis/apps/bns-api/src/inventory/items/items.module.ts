import { ItemsService } from './items.service';
import { ItemsResolver } from './items.resolver';
import { Module } from '@nestjs/common';
import { RepositoryService, RepositoryModule } from '@bns/common/repository';

@Module({
  imports: [RepositoryModule],
  providers: [ItemsService, ItemsResolver, RepositoryService],
})
export class ItemsModule {}
