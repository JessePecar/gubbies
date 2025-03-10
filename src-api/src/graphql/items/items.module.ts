import { ItemsService } from './items.service';
import { ItemsResolver } from './items.resolver';
import { Module } from '@nestjs/common';

@Module({
  imports: [],
  providers: [ItemsService, ItemsResolver],
})
export class ItemsModule {}
