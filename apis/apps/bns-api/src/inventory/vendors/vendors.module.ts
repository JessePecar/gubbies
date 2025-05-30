import { VendorsService } from './vendors.service';
import { VendorsResolver } from './vendors.resolver';
import { Module } from '@nestjs/common';
import { RepositoryService, RepositoryModule } from '@bns/common/repository';
import { SharedService } from '@bns/common/service';

@Module({
  imports: [RepositoryModule],
  providers: [
    VendorsService,
    VendorsResolver,
    RepositoryService,
    SharedService,
  ],
})
export class VendorsModule {}
