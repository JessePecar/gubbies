import { VendorsService } from './vendors.service';
import { VendorsResolver } from './vendors.resolver';
import { Module } from '@nestjs/common';
import { BnsClientService, RepositoryModule } from '@core/repository';
import { SharedService } from '@core/service';

@Module({
  imports: [RepositoryModule],
  providers: [VendorsService, VendorsResolver, BnsClientService, SharedService],
})
export class VendorsModule {}
