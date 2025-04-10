import { ItemsService } from './items.service';
import { ItemsResolver } from './items.resolver';
import { Module } from '@nestjs/common';
import { RepositoryService, RepositoryModule } from 'src/common/repository';

@Module({
  imports: [RepositoryModule],
  providers: [ItemsService, ItemsResolver, RepositoryService],
})
export class ItemsModule {}
