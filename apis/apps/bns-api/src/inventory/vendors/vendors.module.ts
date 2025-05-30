import { VendorsService } from './vendors.service';
import { VendorsResolver } from './vendors.resolver';
import { Module } from '@nestjs/common';
import { BnsRepositoryModule } from '@core/repository';

@Module({
  imports: [BnsRepositoryModule],
  providers: [VendorsService, VendorsResolver],
})
export class VendorsModule {}
