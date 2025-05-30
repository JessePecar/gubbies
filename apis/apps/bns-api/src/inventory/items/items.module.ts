import { ItemsService } from './items.service';
import { ItemsResolver } from './items.resolver';
import { Module } from '@nestjs/common';
import { BnsClientService, BnsRepositoryModule } from '@core/repository';

@Module({
  imports: [BnsRepositoryModule],
  providers: [ItemsService, ItemsResolver, BnsClientService],
})
export class ItemsModule {}
