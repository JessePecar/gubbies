import { ItemsService } from './items.service';
import { ItemsResolver } from './items.resolver';
import { Module } from '@nestjs/common';
import { BnsClientService, BnsRepositoryModule } from '@core/repository';
import { JwtStrategy } from '@core/strategy';

@Module({
  imports: [BnsRepositoryModule],
  providers: [ItemsService, ItemsResolver, BnsClientService, JwtStrategy],
})
export class ItemsModule {}
