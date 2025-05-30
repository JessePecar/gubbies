import { ItemsService } from './items.service';
import { ItemsResolver } from './items.resolver';
import { Module } from '@nestjs/common';
import { BnsClientService, RepositoryModule } from '@core/repository';

@Module({
  imports: [RepositoryModule],
  providers: [ItemsService, ItemsResolver, BnsClientService],
})
export class ItemsModule {}
